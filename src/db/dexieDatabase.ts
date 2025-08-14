// handles the dexie database
import Dexie, { Table } from 'dexie';
import { CrewMember, CrewInfo, TableData } from '../types/CTRTypes';

// Define the database schema
export interface CTRRecord {
  id?: string; // date range as key (YYYY-MM-DD to YYYY-MM-DD)
  dateRange: string;
  data: CrewMember[];
  crewInfo: CrewInfo;
  lastModified: number;
  version: number;
}

// interface for the change log
export interface ChangeLog {
  id?: number;
  dateRange: string;
  changeType: 'create' | 'update' | 'delete';
  field?: string;
  oldValue?: any;
  newValue?: any;
  timestamp: number;
  userId?: string;
}

// Extend Dexie to add our tables
export class DexieDatabase extends Dexie {
  ctrRecords!: Table<CTRRecord>;
  changeLog!: Table<ChangeLog>;
  pendingChanges!: Table<{
    id?: number;
    dateRange: string;
    changes: Partial<CTRRecord>;
    timestamp: number;
  }>;
  tableData!: Dexie.Table<TableData, string>;
  dates!: Dexie.Table<{ date: string }, string>;
  changes!: Dexie.Table<{ 
    id?: number,
    date: string,
    field: string,
    oldValue: string,
    newValue: string,
    timestamp: number 
  }, number>;

  // constructor for the dexie database
  constructor() {
    super('CTRDatabase');
    
    console.log('CTRDatabase constructor called');
    
    this.version(1).stores({
      ctrRecords: 'id, dateRange, lastModified',
      changeLog: '++id, dateRange, timestamp',
      pendingChanges: '++id, dateRange, timestamp',
      tableData: 'date',
      dates: 'date'
    });

    // Add changes table in version 2
    this.version(2).stores({
      ctrRecords: 'id, dateRange, lastModified',
      changeLog: '++id, dateRange, timestamp',
      pendingChanges: '++id, dateRange, timestamp',
      tableData: 'date',
      dates: 'date',
      changes: '++id, date, field, timestamp'
    });

    console.log('Database schema defined');

    // Add hooks for change tracking
    // hook for creating a record
    this.ctrRecords.hook('creating', (primKey, obj: any) => {
      obj.lastModified = Date.now();
      obj.version = 1;
      return obj;
    });

    // hook for updating a record
    this.ctrRecords.hook('updating', (modifications: any, primKey, obj: any) => {
      modifications.lastModified = Date.now();
      modifications.version = (obj.version || 0) + 1;
      return modifications;
    });

    console.log('Database hooks configured');
  }
}

// Create and export a single database instance
export const db = new DexieDatabase();

// Service class for CTR operations with change tracking
export class CTRDataServiceWithTracking {
  private db: DexieDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Initialize database when service is created
    this.initPromise = this.initDB();
  }

  // initialize the database
  private async initDB() {
    if (!this.db) {
      this.db = new DexieDatabase();
    }
  }

  // Ensure database is initialized before any operation
  private async ensureDB() {
    console.log('ensureDB called, initPromise:', !!this.initPromise, 'db:', !!this.db);
    
    // If the init promise is set, wait for it to complete
    if (this.initPromise) {
      console.log('Waiting for initPromise...');
      await this.initPromise;
      this.initPromise = null;
      console.log('initPromise completed');
    }
    
    // If the database is not initialized, initialize it
    if (!this.db) {
      console.log('Database not initialized, calling initDB...');
      await this.initDB();
      console.log('initDB completed, db:', !!this.db);
    }
    
    // If the database is still not initialized, throw an error
    if (!this.db) {
      console.error('Database still not initialized after initDB');
      throw new Error('Database failed to initialize');
    }
    
    console.log('Database is ready for operations');
  }

  // Save record with change tracking
  async saveRecord(date1: string, date2: string, data: CrewMember[], crewInfo: CrewInfo): Promise<void> {
    await this.ensureDB();
    
    const dateRange = `${date1} to ${date2}`;
    
    try {
      // Check if record exists to determine if this is a create or update
      const existingRecord = await this.db!.ctrRecords.get(dateRange);
      const changeType: 'create' | 'update' = existingRecord ? 'update' : 'create';

      // Save the record
      await this.db!.ctrRecords.put({
        id: dateRange,
        dateRange,
        data,
        crewInfo,
        lastModified: Date.now(),
        version: existingRecord ? (existingRecord.version + 1) : 1
      }, dateRange);

      // Log the change
      await this.logChange(dateRange, changeType, {
        data,
        crewInfo
      });

      console.log(`${changeType === 'create' ? 'Created' : 'Updated'} record for date range:`, dateRange);
    } catch (error) {
      console.error('Error saving record:', error);
      throw error;
    }
  }

  // Get record with version tracking
  async getRecord(dateRange: string): Promise<CTRRecord | undefined> {
    await this.ensureDB();
    
    try {
      return await this.db!.ctrRecords.get(dateRange);
    } catch (error) {
      console.error('Error getting record:', error);
      throw error;
    }
  }

  // Get all date ranges with change tracking
  async getAllDateRanges(): Promise<string[]> {
    await this.ensureDB();
    
    try {
      const records = await this.db!.ctrRecords.toArray();
      return records.map(record => record.dateRange).sort();
    } catch (error) {
      console.error('Error getting all date ranges:', error);
      throw error;
    }
  }

  // Delete record with change tracking
  async deleteRecord(dateRange: string): Promise<void> {
    await this.ensureDB();
    
    try {
      const existingRecord = await this.db!.ctrRecords.get(dateRange);
      if (existingRecord) {
        // Log the deletion
        await this.logChange(dateRange, 'delete', existingRecord);
        
        // Delete the record
        await this.db!.ctrRecords.delete(dateRange);
        console.log('Deleted record for date range:', dateRange);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  }

  // Get change history for a date range
  async getChangeHistory(dateRange: string): Promise<ChangeLog[]> {
    await this.ensureDB();
    
    try {
      return await this.db!.changeLog
        .where('dateRange')
        .equals(dateRange)
        .reverse()
        .sortBy('timestamp');
    } catch (error) {
      console.error('Error getting change history:', error);
      throw error;
    }
  }

  // Get all changes since a specific timestamp
  async getChangesSince(timestamp: number): Promise<ChangeLog[]> {
    await this.ensureDB();
    
    try {
      return await this.db!.changeLog
        .where('timestamp')
        .above(timestamp)
        .reverse()
        .sortBy('timestamp');
    } catch (error) {
      console.error('Error getting changes since timestamp:', error);
      throw error;
    }
  }

  // Track specific field changes
  async trackFieldChange(dateRange: string, field: string, oldValue: any, newValue: any): Promise<void> {
    await this.ensureDB();
    
    try {
      await this.logChange(dateRange, 'update', {
        field,
        oldValue,
        newValue
      });
    } catch (error) {
      console.error('Error tracking field change:', error);
    }
  }

  // Auto-save pending changes
  async savePendingChanges(): Promise<void> {
    await this.ensureDB();
    
    try {
      const pendingChanges = await this.db!.pendingChanges.toArray();
      
      // save each pending change
      for (const pending of pendingChanges) {
        const record = await this.db!.ctrRecords.get(pending.dateRange);
        if (record) {
          const updatedRecord = { ...record, ...pending.changes };
          await this.saveRecord(
            pending.dateRange.split(' to ')[0],
            pending.dateRange.split(' to ')[1],
            updatedRecord.data,
            updatedRecord.crewInfo
          );
        }
        
        // Remove the pending change
        await this.db!.pendingChanges.delete(pending.id!);
      }
    } catch (error) {
      console.error('Error saving pending changes:', error);
      throw error;
    }
  }

  // Function to add pending change for auto-save
  async addPendingChange(dateRange: string, changes: Partial<CTRRecord>): Promise<void> {
    await this.ensureDB();
    
    try {
      // adds the pending change
      await this.db!.pendingChanges.add({
        dateRange,
        changes,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error adding pending change:', error);
    }
  }

  // Function to get the pending changes count
  async getPendingChangesCount(): Promise<number> {
    await this.ensureDB();
    
    try {
      return await this.db!.pendingChanges.count();
    } catch (error) {
      console.error('Error getting pending changes count:', error);
      return 0;
    }
  }

  // Function to clear all pending changes
  async clearPendingChanges(): Promise<void> {
    await this.ensureDB();
    
    // clears all pending changes
    try {
      await this.db!.pendingChanges.clear();
    } catch (error) {
      console.error('Error clearing pending changes:', error);
    }
  }

  // Private method to log changes
  private async logChange(dateRange: string, changeType: 'create' | 'update' | 'delete', data: any): Promise<void> {
    await this.ensureDB();
    
    try {
      await this.db!.changeLog.add({
        dateRange,
        changeType,
        ...data,
        timestamp: Date.now(),
        userId: 'current-user' // Could be enhanced with actual user tracking
      });
    } catch (error) {
      console.error('Error logging change:', error);
    }
  }

  // Function to get database statistics
  async getDatabaseStats(): Promise<{
    totalRecords: number;
    totalChanges: number;
    pendingChanges: number;
    lastModified: number;
  }> {
    await this.ensureDB();
    
    try {
      // retrieves the total records, total changes, and pending changes
      const [totalRecords, totalChanges, pendingChanges] = await Promise.all([
        this.db!.ctrRecords.count(),
        this.db!.changeLog.count(),
        this.db!.pendingChanges.count()
      ]);

      // retrieves the last modified record
      const lastRecord = await this.db!.ctrRecords
        .orderBy('lastModified')
        .reverse()
        .first();

      // returns above
      return {
        totalRecords,
        totalChanges,
        pendingChanges,
        lastModified: lastRecord?.lastModified || 0
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const ctrDataServiceWithTracking = new CTRDataServiceWithTracking(); 