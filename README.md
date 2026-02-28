 # 💪 FIT ZONE - Gym Management System

A comprehensive gym management system with a fully responsive Arabic interface, built using pure HTML, CSS, and JavaScript. The system provides complete CRUD operations for member management with real-time updates.

## ✨ **Core Features**

### ✅ **Authentication System** (`1-login.html`)
- **Dual Login Methods:** Email or phone number authentication
- **3-Step Registration Process:**
  - Step 1: Personal information (name, birth date, gender)
  - Step 2: Account details (email, phone, password strength indicator)
  - Step 3: Membership plan selection
- **Membership Plans:**
  - 💙 Basic (299 SAR/month) - Equipment access, 2 group classes/week
  - 💜 Professional (499 SAR/month) - Unlimited classes, 4 personal training sessions
  - 💚 Premium (799 SAR/month) - All features + sauna, jacuzzi, weekly massage
- **Social Login:** Google, Facebook, Apple, Twitter integration
- **Password Recovery:** "Forgot Password" modal with email reset

### ✅ **Interactive Dashboard** (`2-dashboard.html`)
- **Collapsible Sidebar:** Smooth animations for mobile/desktop
- **Smart Search Bar:** Real-time filtering across all sections
- **Notification System:**
  - Live notification count badge
  - Dropdown with unread indicators
  - Mark as read functionality
  - Auto-refresh every minute (demo mode)
- **Statistics Cards:**
  - Total Members: 156 (+12 this month)
  - Today's Bookings: 43 (+8 from yesterday)
  - Active Trainers: 12 (-2 this week)
  - Revenue: 45,678 SAR (+23% this month)
- **Quick Access:** 6 quick links to main sections
- **Recent Bookings Table:** 4 sample bookings with status badges
- **Activity Feed:** Real-time activity updates

### ✅ **Complete Members Management System** (`3-members.html`)

#### **Member Statistics Dashboard**
- 📊 **Total Members:** Live count of all members
- ✅ **Active Members:** Currently active subscriptions
- ⏰ **Expired Members:** Members needing renewal
- 🆕 **New Members:** Joined this month

#### **Advanced Filtering System**
- 🔍 **Membership Filter:** All / Basic / Professional / Premium
- 📌 **Status Filter:** All / Active / Expired / Pending
- 📅 **Date Filter:** Filter by join date

#### **Dual View Modes**
- 📋 **Table View:** 
  - Sortable columns
  - Member avatars with initials
  - Color-coded membership badges
  - Status indicators with labels
  - Action buttons for each row
- 🃏 **Grid View:**
  - Card-based layout
  - Visual member cards
  - Quick action buttons
  - Member details in organized rows

#### **Member Operations (Fully Functional)**
```javascript
// Core CRUD Operations
- addMember() - Open form with empty fields
- editMember(id) - Load existing data into form
- saveMember() - Validate and save to localStorage
- deleteMember(id) - Confirm and remove member
- viewMember(id) - Display complete profile