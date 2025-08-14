# Admin Guide: Generating Pre-filled URLs for CTR App

## 🎯 Overview

This guide shows how to create pre-filled URLs that automatically populate crew information when users visit the CTR app. This is perfect for admins who want to send specific crews to the app with their information already filled in.

## 📋 URL Parameters

The app accepts the following URL parameters:

| Parameter | Description | Example | Required |
|-----------|-------------|---------|----------|
| `crewName` | Crew name | `Alpha Crew` | No |
| `crewNumber` | Crew identifier | `A1` | No |
| `fireName` | Fire name | `Smith Fire` | No |
| `fireNumber` | Fire number | `2024-001` | No |
| `date` | Date range | `2024-01-15 to 2024-01-16` | No |

## 🔗 URL Format

```
https://joonk4ng.github.io?crewName=Alpha%20Crew&crewNumber=A1&fireName=Smith%20Fire&fireNumber=2024-001&date=2024-01-15%20to%202024-01-16
```

## 📝 How to Create URLs

### **Step 1: Base URL**
Start with: `https://joonk4ng.github.io`

### **Step 2: Add Parameters**
Add `?` followed by your parameters separated by `&`:

```
https://joonk4ng.github.io?crewName=YOUR_CREW_NAME&crewNumber=YOUR_CREW_NUMBER&fireName=YOUR_FIRE_NAME&fireNumber=YOUR_FIRE_NUMBER&date=YOUR_DATE_RANGE
```

### **Step 3: URL Encode Special Characters**
Replace spaces and special characters:
- **Space** → `%20`
- **&** → `%26`
- **=** → `%3D`
- **/** → `%2F`

## 🛠️ URL Encoding Examples

### **Example 1: Alpha Crew**
```
Original: Alpha Crew
Encoded: Alpha%20Crew
```

### **Example 2: Smith Fire**
```
Original: Smith Fire
Encoded: Smith%20Fire
```

### **Example 3: Date Range**
```
Original: 2024-01-15 to 2024-01-16
Encoded: 2024-01-15%20to%202024-01-16
```

## 📋 Complete URL Examples

### **Example 1: Alpha Crew - Smith Fire**
```
https://joonk4ng.github.io?crewName=Alpha%20Crew&crewNumber=A1&fireName=Smith%20Fire&fireNumber=2024-001&date=2024-01-15%20to%202024-01-16
```

### **Example 2: Bravo Crew - Johnson Fire**
```
https://joonk4ng.github.io?crewName=Bravo%20Crew&crewNumber=B2&fireName=Johnson%20Fire&fireNumber=2024-002&date=2024-01-15%20to%202024-01-16
```

### **Example 3: Charlie Crew - Williams Fire**
```
https://joonk4ng.github.io?crewName=Charlie%20Crew&crewNumber=C3&fireName=Williams%20Fire&fireNumber=2024-003&date=2024-01-15%20to%202024-01-16
```

## 🔧 URL Builder Tool

You can use this JavaScript function to generate URLs:

```javascript
function buildCTRUrl(crewName, crewNumber, fireName, fireNumber, dateRange) {
  const baseUrl = 'https://joonk4ng.github.io';
  const params = new URLSearchParams();
  
  if (crewName) params.set('crewName', crewName);
  if (crewNumber) params.set('crewNumber', crewNumber);
  if (fireName) params.set('fireName', fireName);
  if (fireNumber) params.set('fireNumber', fireNumber);
  if (dateRange) params.set('date', dateRange);
  
  return `${baseUrl}?${params.toString()}`;
}

// Example usage:
const url = buildCTRUrl('Alpha Crew', 'A1', 'Smith Fire', '2024-001', '2024-01-15 to 2024-01-16');
console.log(url);
```

## 📱 How It Works for Users

1. **User clicks the link** → App opens with pre-filled information
2. **Crew info is auto-populated** → No manual entry needed
3. **Date is selected** → If provided in URL
4. **URL parameters are cleared** → Clean URL after loading
5. **Success notification** → User sees "Crew information loaded from URL parameters"

## ✅ Validation Rules

The app validates URL parameters:

- **Date Format**: Must be `YYYY-MM-DD to YYYY-MM-DD`
- **Crew Number**: Letters and numbers only (A-Z, 0-9)
- **Fire Number**: Numbers and hyphens only (0-9, -)

## 🚨 Error Handling

If URL parameters are invalid:
- User sees error notification
- App loads normally without pre-filling
- Invalid parameters are ignored

## 📋 Admin Workflow

### **For Daily Operations:**
1. Create URLs for each crew
2. Send links via email/text
3. Crew members click and start working immediately

### **For Emergency Response:**
1. Quickly generate URLs with fire information
2. Distribute to responding crews
3. Crews can start documenting immediately

### **For Training:**
1. Create sample URLs with test data
2. Use for training sessions
3. Demonstrate app functionality

## 🔗 Quick Reference

### **Minimal URL (crew only):**
```
https://joonk4ng.github.io?crewName=Alpha%20Crew&crewNumber=A1
```

### **Full URL (all parameters):**
```
https://joonk4ng.github.io?crewName=Alpha%20Crew&crewNumber=A1&fireName=Smith%20Fire&fireNumber=2024-001&date=2024-01-15%20to%202024-01-16
```

### **URL with just fire info:**
```
https://joonk4ng.github.io?fireName=Smith%20Fire&fireNumber=2024-001
```

## 💡 Tips for Admins

1. **Bookmark common URLs** for quick access
2. **Use consistent naming** for easy management
3. **Test URLs** before sending to crews
4. **Keep URLs short** when possible
5. **Include date ranges** for specific incidents

## 🎯 Benefits

- **Faster setup** for crews
- **Reduced errors** from manual entry
- **Consistent data** across crews
- **Emergency ready** for quick deployment
- **Training friendly** with sample data

---

**Happy URL building! This feature makes it easy to get crews started quickly and efficiently.** 