// ===== Login page functions=====//

//General variables//
let currentStep = 1;
let selectedPlan = null;

// ===== Formatting when loading the page =====//
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة تسجيل الدخول جاهزة');
});

// ===== Tab functions =====//

// Switch between the login and account creation tabs//
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-content').forEach(c => c.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('login-content').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('register-content').classList.add('active');
    }
}

// ===== Login functions =====//

// Choose a login method//
function selectLoginMethod(method) {
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
    document.getElementById(method + '-option').classList.add('active');
    
    document.querySelectorAll('.login-field').forEach(f => f.classList.remove('active'));
    document.getElementById(method + '-login').classList.add('active');
}
//Hide password//
function togglePassword(element) {
    const input = element.parentElement.querySelector('input');
    if (input.type === 'password') {
        input.type = 'text';
        element.classList.remove('fa-eye');
        element.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        element.classList.remove('fa-eye-slash');
        element.classList.add('fa-eye');
    }
}

// Login processing//
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail')?.value;
    const phone = document.getElementById('loginPhone')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!password) {
        showNotification('يرجى إدخال كلمة المرور', 'error');
        return;
    }
    
    if (!email && !phone) {
        showNotification('يرجى إدخال البريد الإلكتروني أو رقم الهاتف', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const userData = {
            name: 'أحمد محمد',
            email: email || 'user@example.com',
            membership: 'عضوية احترافية'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('تم تسجيل الدخول بنجاح', 'success');
        
        setTimeout(() => {
            window.location.href = '2-dashboard.html';
        }, 1000);
    }, 1500);
}

// ===== Account creation functions =====//

// Upgrade your password strength//
function updatePasswordStrength(password) {
    const bar = document.querySelector('.strength-bar');
    const text = document.querySelector('.password-strength span');
    
    if (!bar || !text) return;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const width = (strength / 5) * 100;
    bar.style.setProperty('--strength-width', width + '%');
    
    const levels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية', 'قوية جداً'];
    text.textContent = `قوة كلمة المرور: ${levels[strength]}`;
}

// Navigating between login steps//
function nextStep(step) {
    if (!validateStep(currentStep)) return;
    
    document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    currentStep = step;
    
    document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
}

function prevStep(step) {
    document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    currentStep = step;
    
    document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
}

// Verify the validity of each step//
function validateStep(step) {
    switch(step) {
        case 1:
            const firstName = document.getElementById('firstName')?.value;
            const lastName = document.getElementById('lastName')?.value;
            const birthDate = document.getElementById('birthDate')?.value;
            
            if (!firstName || !lastName) {
                showNotification('يرجى إدخال الاسم الكامل', 'error');
                return false;
            }
            if (!birthDate) {
                showNotification('يرجى إدخال تاريخ الميلاد', 'error');
                return false;
            }
            return true;
            
        case 2:
            const email = document.getElementById('registerEmail')?.value;
            const phone = document.getElementById('registerPhone')?.value;
            const password = document.getElementById('registerPassword')?.value;
            const confirm = document.getElementById('confirmPassword')?.value;
            
            if (!email || !phone) {
                showNotification('يرجى إدخال البريد الإلكتروني ورقم الهاتف', 'error');
                return false;
            }
            if (password.length < 6) {
                showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
                return false;
            }
            if (password !== confirm) {
                showNotification('كلمة المرور غير متطابقة', 'error');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

//Choosing a membership plan//
function selectPlan(plan) {
    selectedPlan = plan;
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('plan-' + plan)?.classList.add('selected');
}

// Account creation process//
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const email = document.getElementById('registerEmail')?.value;
    const phone = document.getElementById('registerPhone')?.value;
    const password = document.getElementById('registerPassword')?.value;
    const terms = document.getElementById('termsAgree')?.checked;
    
    if (!firstName || !lastName || !email || !phone || !password) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('يجب الموافقة على الشروط والأحكام', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const userData = {
            name: firstName + ' ' + lastName,
            email: email,
            phone: phone,
            membership: selectedPlan === 'pro' ? 'عضوية احترافية' : 
                       selectedPlan === 'premium' ? 'عضوية مميزة' : 'عضوية أساسية'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('تم إنشاء الحساب بنجاح', 'success');
        
        setTimeout(() => {
            window.location.href = '2-dashboard.html';
        }, 1000);
    }, 2000);
}

// =====Functions window, forgotten password=====//

function showForgotPassword() {
    document.getElementById('forgotModal').style.display = 'flex';
}

function closeForgotModal() {
    document.getElementById('forgotModal').style.display = 'none';
}

function sendResetLink() {
    const email = document.getElementById('resetEmail')?.value;
    if (!email) {
        showNotification('يرجى إدخال البريد الإلكتروني', 'error');
        return;
    }
    
    showLoading();
    setTimeout(() => {
        hideLoading();
        closeForgotModal();
        showNotification('تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني', 'success');
    }, 1500);
}

// ===== Log in via social media =====//

function socialLogin(platform) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const userData = {
            name: 'مستخدم ' + platform,
            email: 'user@' + platform + '.com',
            membership: 'عضوية احترافية'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('تم تسجيل الدخول عبر ' + platform, 'success');
        
        setTimeout(() => {
            window.location.href = '2-dashboard.html';
        }, 1000);
    }, 1500);
}

// ===== Helpful functions =====//

// Show notifications//
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show loading//
function showLoading() {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
}

// Hide download//
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}


// ===== function dashboard =====//



// Check your login when you open the page//
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('2-dashboard.html')) {
        checkAuth();
        loadUserData();
        highlightActiveMenu();
        updateDateTime();
    }
});

// Login verification//
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '1-login.html';
    }
}

// Upload user data//
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = userData.name || 'أحمد محمد';
    });
    
    document.querySelectorAll('.user-membership').forEach(el => {
        el.textContent = userData.membership || 'عضوية احترافية';
    });
    
    // Update username in welcome//
    const welcomeName = document.getElementById('welcomeUserName');
    if (welcomeName) {
        const firstName = (userData.name || 'أحمد').split(' ')[0];
        welcomeName.textContent = firstName;
    }
}

// Activate the active link in the list//
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Switch user menu//
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// Close the menu when you click outside of it//
document.addEventListener('click', function(event) {
    const menu = document.getElementById('userMenu');
    const button = document.querySelector('.user-dropdown');
    
    if (menu && button && !button.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Log out //
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        showNotification('تم تسجيل الخروج بنجاح', 'success');
        setTimeout(() => {
            window.location.href = '1-login.html';
        }, 1000);
    }
}

// Update date and time//
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    document.querySelectorAll('.current-date').forEach(el => {
        el.textContent = now.toLocaleDateString('ar-SA', options);
    });
}

// Date updated every minute//
setInterval(updateDateTime, 60000);

// Temporary functions for other pages//
function viewAllBookings() {
    alert('سيتم فتح صفحة جميع الحجوزات');
}

function addMember() {
    alert('فتح نموذج إضافة عضو جديد');
}

function bookClass(classId) {
    alert('تم حجز الحصة رقم: ' + classId);
}

// ===== Functions to show and hide the sidebar =====

// Switch sidebar status//
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleIcon = document.querySelector('.menu-toggle i');
    
    if (window.innerWidth <= 768) {
        // For small screens//
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent scrolling when opening the menu//
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        //For large screens//
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        //The icon's shape has changed.//
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
        } else {
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
        }
    }
}
//The menu closes when you click on the background layer//
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update menu status when changing screens//
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleIcon = document.querySelector('.menu-toggle i');
    
    if (window.innerWidth > 768) {
        //For large screens//
        sidebar.classList.remove('active');
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('sidebar-collapsed');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
        }
    }
});

// Prevent the menu from closing when clicked within it.//
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
// =====Notification functions =====//

// Experimental data for notifications//
let notifications = [
    {
        id: 1,
        title: 'تم إضافة عضو جديد',
        description: 'أحمد محمد انضم للصالة الرياضية',
        time: 'منذ 5 دقائق',
        icon: 'fa-user-plus',
        iconColor: 'blue',
        read: false
    },
    {
        id: 2,
        title: 'حجز جديد',
        description: 'تم حجز حصة تمارين قوة',
        time: 'منذ 15 دقيقة',
        icon: 'fa-calendar-check',
        iconColor: 'green',
        read: false
    },
    {
        id: 3,
        title: 'تذكير بموعد',
        description: 'حصتك بعد ساعة',
        time: 'منذ 30 دقيقة',
        icon: 'fa-clock',
        iconColor: 'orange',
        read: false
    },
    {
        id: 4,
        title: 'دفعة جديدة',
        description: 'تم استلام دفعة بقيمة 499 ريال',
        time: 'منذ ساعة',
        icon: 'fa-credit-card',
        iconColor: 'blue',
        read: true
    },
    {
        id: 5,
        title: 'عضوية منتهية',
        description: '3 أعضاء بحاجة لتجديد العضوية',
        time: 'منذ 3 ساعات',
        icon: 'fa-exclamation-triangle',
        iconColor: 'red',
        read: true
    }
];

// Switch notifications list//
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    dropdown.classList.toggle('show');
    loadNotifications();
    
    // Close the user menu if it is open//
    const userMenu = document.getElementById('userMenu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    }
}

// Download notifications//
function loadNotifications() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    
    // Counting the number of unread notifications//
    const unreadCount = notifications.filter(n => !n.read).length;
    updateNotificationBadge(unreadCount);
    
    // View notifications//
    let html = '';
    notifications.slice(0, 4).forEach(notif => {
        html += `
            <div class="notification-item ${!notif.read ? 'unread' : ''}" onclick="markAsRead(${notif.id})">
                <div class="notification-icon ${notif.iconColor}">
                    <i class="fas ${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notif.title}</div>
                    <div style="font-size: 12px; color: #666;">${notif.description}</div>
                    <div class="notification-time">${notif.time}</div>
                </div>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

// Update notification badge//
function updateNotificationBadge(count) {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Mark notifications as read//
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        loadNotifications();
        showNotification('تم تحديد الإشعار كمقروء', 'info');
    }
}

// Mark all as read//
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    loadNotifications();
    showNotification('تم تحديد جميع الإشعارات كمقروءة', 'success');
}

// Add new notification//
function addNotification(title, description, icon, iconColor) {
    const newNotification = {
        id: notifications.length + 1,
        title: title,
        description: description,
        time: 'الآن',
        icon: icon || 'fa-bell',
        iconColor: iconColor || 'blue',
        read: false
    };
    
    notifications.unshift(newNotification);
    loadNotifications();
    
    // Show pop-up message//
    showNotification('🔔 إشعار جديد: ' + title, 'info');
}

// Simulating new notifications every minute//
setInterval(() => {
    const randomNotifications = [
        {
            title: 'عضو جديد',
            description: 'انضم عضو جديد إلى الصالة',
            icon: 'fa-user-plus',
            color: 'blue'
        },
        {
            title: 'حجز جديد',
            description: 'تم حجز حصة تدريبية',
            icon: 'fa-calendar-check',
            color: 'green'
        },
        {
            title: 'دفعة مستلمة',
            description: 'تم استلام دفعة جديدة',
            icon: 'fa-credit-card',
            color: 'blue'
        },
        {
            title: 'تذكير',
            description: 'لديك حصة بعد 30 دقيقة',
            icon: 'fa-clock',
            color: 'orange'
        }
    ];
    
    //30% pinch to get a new notification every minute//
    if (Math.random() < 0.3) {
        const random = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(random.title, random.description, random.icon, random.color);
    }
}, 60000); // every minute//

// Disable notifications when you click outside of them//
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationsDropdown');
    const bell = document.querySelector('.notifications');
    
    if (dropdown && bell && !bell.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});
// ===== Members Page Functions =====//

// Global members data//
let currentView = 'table'; // 'table' or 'grid'//
let currentPage = 1;
let membersPerPage = 10;
let membersData = [
    {
        id: 1,
        name: 'Ahmed Mohammed Ali',
        email: 'ahmed@email.com',
        phone: '0501234567',
        membership: 'pro',
        membershipType: 'Professional',
        joinDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active',
        gender: 'male',
        birthDate: '1990-05-15',
        address: 'Riyadh, Al-Nuzhah District'
    },
    {
        id: 2,
        name: 'Sara Khaled',
        email: 'sara@email.com',
        phone: '0559876543',
        membership: 'premium',
        membershipType: 'Premium',
        joinDate: '2024-01-05',
        endDate: '2025-01-04',
        status: 'active',
        gender: 'female',
        birthDate: '1992-08-20',
        address: 'Jeddah, Al-Rawdah District'
    },
    {
        id: 3,
        name: 'Mohammed Omar',
        email: 'mohamed@email.com',
        phone: '0561122334',
        membership: 'basic',
        membershipType: 'Basic',
        joinDate: '2023-12-15',
        endDate: '2024-03-14',
        status: 'pending',
        gender: 'male',
        birthDate: '1988-11-10',
        address: 'Dammam, Al-Shati District'
    },
    {
        id: 4,
        name: 'Noura Ahmed',
        email: 'noura@email.com',
        phone: '0598765432',
        membership: 'pro',
        membershipType: 'Professional',
        joinDate: '2023-11-20',
        endDate: '2024-02-19',
        status: 'inactive',
        gender: 'female',
        birthDate: '1995-03-25',
        address: 'Al-Khobar, Al-Ulya District'
    },
    {
        id: 5,
        name: 'Faisal Abdullah',
        email: 'faisal@email.com',
        phone: '0576655443',
        membership: 'basic',
        membershipType: 'Basic',
        joinDate: '2024-01-10',
        endDate: '2024-04-09',
        status: 'active',
        gender: 'male',
        birthDate: '1993-07-30',
        address: 'Makkah, Al-Aziziyah District'
    }
];

// Load members page//
function loadMembersPage() {
    console.log('Loading members page...');
    updateMemberStats();
    renderMembersTable();
}

// Update member statistics//
function updateMemberStats() {
    const total = membersData.length;
    const active = membersData.filter(m => m.status === 'active').length;
    const expired = membersData.filter(m => m.status === 'inactive').length;
    const newThisMonth = membersData.filter(m => {
        const joinDate = new Date(m.joinDate);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length;

    document.getElementById('totalMembers').textContent = total;
    document.getElementById('activeMembers').textContent = active;
    document.getElementById('expiredMembers').textContent = expired;
    document.getElementById('newMembers').textContent = newThisMonth;
}

// Toggle view (table/grid)//
function toggleView(view) {
    currentView = view;
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    const tableView = document.getElementById('tableView');
    const gridView = document.getElementById('gridView');
    
    if (view === 'table') {
        tableView.style.display = 'block';
        gridView.style.display = 'none';
        renderMembersTable();
    } else {
        tableView.style.display = 'none';
        gridView.style.display = 'block';
        renderMembersGrid();
    }
}

// Render members table//
function renderMembersTable() {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;
    
    let html = '';
    membersData.forEach(member => {
        const statusClass = member.status === 'active' ? 'active' : 
                           member.status === 'inactive' ? 'inactive' : 'pending';
        const statusText = member.status === 'active' ? 'Active' :
                          member.status === 'inactive' ? 'Expired' : 'Pending';
        
        const membershipClass = member.membership === 'premium' ? 'premium' :
                               member.membership === 'pro' ? 'pro' : 'basic';
        const membershipText = member.membershipType;
        
        html += `
            <tr>
                <td>
                    <div class="member-table-avatar">
                        <div class="member-avatar-small">${member.name.charAt(0)}</div>
                        ${member.name}
                    </div>
                </td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td><span class="membership-badge ${membershipClass}">${membershipText}</span></td>
                <td>${member.joinDate}</td>
                <td>${member.endDate}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" onclick="viewMember(${member.id})" title="View"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon btn-edit" onclick="editMember(${member.id})" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-delete" onclick="deleteMember(${member.id})" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Render members grid//
function renderMembersGrid() {
    const grid = document.getElementById('membersGrid');
    if (!grid) return;
    
    let html = '';
    membersData.forEach(member => {
        const statusClass = member.status === 'active' ? 'active' : 
                           member.status === 'inactive' ? 'inactive' : 'pending';
        const statusText = member.status === 'active' ? 'Active' :
                          member.status === 'inactive' ? 'Expired' : 'Pending';
        
        const membershipClass = member.membership === 'premium' ? 'premium' :
                               member.membership === 'pro' ? 'pro' : 'basic';
        
        html += `
            <div class="member-card">
                <div class="member-card-header">
                    <div class="member-card-avatar">${member.name.charAt(0)}</div>
                    <div class="member-card-info">
                        <h4>${member.name}</h4>
                        <span class="member-card-badge ${membershipClass}">${member.membershipType}</span>
                    </div>
                </div>
                <div class="member-card-body">
                    <div class="member-card-info-row">
                        <i class="fas fa-envelope"></i>
                        <span>${member.email}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-phone"></i>
                        <span>${member.phone}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Joined: ${member.joinDate}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-calendar-times"></i>
                        <span>Ends: ${member.endDate}</span>
                    </div>
                </div>
                <div class="member-card-footer">
                    <span class="member-card-status ${statusClass}">${statusText}</span>
                    <div class="member-card-actions">
                        <button class="btn-icon btn-view" onclick="viewMember(${member.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon btn-edit" onclick="editMember(${member.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-delete" onclick="deleteMember(${member.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Filter members//
function filterMembers() {
    const membershipFilter = document.getElementById('membershipFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filtered = [...membersData];
    
    if (membershipFilter !== 'all') {
        filtered = filtered.filter(m => m.membership === membershipFilter);
    }
    
    if (statusFilter !== 'all') {
        filtered = filtered.filter(m => m.status === statusFilter);
    }
    
    if (dateFilter) {
        filtered = filtered.filter(m => m.joinDate >= dateFilter);
    }
    
    // Update view//
    if (currentView === 'table') {
        renderFilteredTable(filtered);
    } else {
        renderFilteredGrid(filtered);
    }
}

// Render filtered table//
function renderFilteredTable(filtered) {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;
    
    let html = '';
    filtered.forEach(member => {
        const statusClass = member.status === 'active' ? 'active' : 
                           member.status === 'inactive' ? 'inactive' : 'pending';
        const statusText = member.status === 'active' ? 'Active' :
                          member.status === 'inactive' ? 'Expired' : 'Pending';
        
        const membershipClass = member.membership === 'premium' ? 'premium' :
                               member.membership === 'pro' ? 'pro' : 'basic';
        const membershipText = member.membershipType;
        
        html += `
            <tr>
                <td>
                    <div class="member-table-avatar">
                        <div class="member-avatar-small">${member.name.charAt(0)}</div>
                        ${member.name}
                    </div>
                </td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td><span class="membership-badge ${membershipClass}">${membershipText}</span></td>
                <td>${member.joinDate}</td>
                <td>${member.endDate}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" onclick="viewMember(${member.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon btn-edit" onclick="editMember(${member.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-delete" onclick="deleteMember(${member.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Render filtered grid//
function renderFilteredGrid(filtered) {
    const grid = document.getElementById('membersGrid');
    if (!grid) return;
    
    let html = '';
    filtered.forEach(member => {
        const statusClass = member.status === 'active' ? 'active' : 
                           member.status === 'inactive' ? 'inactive' : 'pending';
        const statusText = member.status === 'active' ? 'Active' :
                          member.status === 'inactive' ? 'Expired' : 'Pending';
        
        const membershipClass = member.membership === 'premium' ? 'premium' :
                               member.membership === 'pro' ? 'pro' : 'basic';
        
        html += `
            <div class="member-card">
                <div class="member-card-header">
                    <div class="member-card-avatar">${member.name.charAt(0)}</div>
                    <div class="member-card-info">
                        <h4>${member.name}</h4>
                        <span class="member-card-badge ${membershipClass}">${member.membershipType}</span>
                    </div>
                </div>
                <div class="member-card-body">
                    <div class="member-card-info-row">
                        <i class="fas fa-envelope"></i>
                        <span>${member.email}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-phone"></i>
                        <span>${member.phone}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Joined: ${member.joinDate}</span>
                    </div>
                    <div class="member-card-info-row">
                        <i class="fas fa-calendar-times"></i>
                        <span>Ends: ${member.endDate}</span>
                    </div>
                </div>
                <div class="member-card-footer">
                    <span class="member-card-status ${statusClass}">${statusText}</span>
                    <div class="member-card-actions">
                        <button class="btn-icon btn-view" onclick="viewMember(${member.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon btn-edit" onclick="editMember(${member.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-delete" onclick="deleteMember(${member.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Search members//
function searchMembers(input) {
    const searchText = input.value.toLowerCase();
    
    const filtered = membersData.filter(member => 
        member.name.toLowerCase().includes(searchText) ||
        member.email.toLowerCase().includes(searchText) ||
        member.phone.includes(searchText)
    );
    
    if (currentView === 'table') {
        renderFilteredTable(filtered);
    } else {
        renderFilteredGrid(filtered);
    }
}

// Add new member - FIXED//
function addMember() {
    // Reset form//
    document.getElementById('memberModalTitle').textContent = 'Add New Member';
    document.getElementById('memberId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('birthDate').value = '';
    document.getElementById('gender').value = 'male';
    document.getElementById('membershipType').value = 'basic';
    document.getElementById('status').value = 'active';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('address').value = '';
    
    // Show modal//
    document.getElementById('memberModal').style.display = 'flex';
}

// Edit member - FIXED//
function editMember(id) {
    const member = membersData.find(m => m.id === id);
    if (!member) return;
    
    document.getElementById('memberModalTitle').textContent = 'Edit Member';
    document.getElementById('memberId').value = member.id;
    document.getElementById('fullName').value = member.name;
    document.getElementById('email').value = member.email;
    document.getElementById('phone').value = member.phone;
    document.getElementById('birthDate').value = member.birthDate;
    document.getElementById('gender').value = member.gender;
    document.getElementById('membershipType').value = member.membership;
    document.getElementById('status').value = member.status;
    document.getElementById('startDate').value = member.joinDate;
    document.getElementById('endDate').value = member.endDate;
    document.getElementById('address').value = member.address;
    
    document.getElementById('memberModal').style.display = 'flex';
}

// Save member - FIXED//
function saveMember() {
    // Get form values//
    const memberId = document.getElementById('memberId').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const membershipType = document.getElementById('membershipType').value;
    const status = document.getElementById('status').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const address = document.getElementById('address').value;
    
    // Validate required fields//
    if (!fullName || !email || !phone || !startDate || !endDate) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Determine membership display name//
    let membershipDisplayName = 'Basic';
    if (membershipType === 'pro') membershipDisplayName = 'Professional';
    if (membershipType === 'premium') membershipDisplayName = 'Premium';
    
    // Create member object//
    const memberData = {
        id: memberId ? parseInt(memberId) : generateNewId(),
        name: fullName,
        email: email,
        phone: phone,
        membership: membershipType,
        membershipType: membershipDisplayName,
        joinDate: startDate,
        endDate: endDate,
        status: status,
        gender: gender,
        birthDate: birthDate,
        address: address
    };
    
    if (memberId) {
        // Edit existing member//
        const index = membersData.findIndex(m => m.id === parseInt(memberId));
        if (index !== -1) {
            membersData[index] = memberData;
            showNotification('Member updated successfully', 'success');
        }
    } else {
        // Add new member//
        membersData.push(memberData);
        showNotification('Member added successfully', 'success');
    }
    
    // Close modal and refresh view//
    closeMemberModal();
    updateMemberStats();
    
    if (currentView === 'table') {
        renderMembersTable();
    } else {
        renderMembersGrid();
    }
}

// Generate new ID//
function generateNewId() {
    const maxId = membersData.reduce((max, member) => Math.max(max, member.id), 0);
    return maxId + 1;
}

// Delete member//
function deleteMember(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        membersData = membersData.filter(m => m.id !== id);
        showNotification('Member deleted successfully', 'success');
        updateMemberStats();
        
        if (currentView === 'table') {
            renderMembersTable();
        } else {
            renderMembersGrid();
        }
    }
}

// View member details//
function viewMember(id) {
    const member = membersData.find(m => m.id === id);
    if (!member) return;
    
    const statusText = member.status === 'active' ? 'Active' :
                      member.status === 'inactive' ? 'Expired' : 'Pending';
    
    const detailsHtml = `
        <div class="member-profile-card">
            <div class="member-profile-header">
                <div class="member-profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="member-profile-name">${member.name}</div>
                <div class="member-profile-badge">${member.membershipType}</div>
            </div>
            <div class="member-profile-body">
                <div class="member-profile-info">
                    <i class="fas fa-envelope"></i>
                    <span>Email:</span>
                    <strong>${member.email}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-phone"></i>
                    <span>Phone:</span>
                    <strong>${member.phone}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Birth Date:</span>
                    <strong>${member.birthDate}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-venus-mars"></i>
                    <span>Gender:</span>
                    <strong>${member.gender === 'male' ? 'Male' : 'Female'}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-calendar-check"></i>
                    <span>Join Date:</span>
                    <strong>${member.joinDate}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-calendar-times"></i>
                    <span>End Date:</span>
                    <strong>${member.endDate}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Address:</span>
                    <strong>${member.address}</strong>
                </div>
                <div class="member-profile-info">
                    <i class="fas fa-info-circle"></i>
                    <span>Status:</span>
                    <strong><span class="status-badge ${member.status}">${statusText}</span></strong>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('memberDetailsContent').innerHTML = detailsHtml;
    document.getElementById('viewMemberModal').style.display = 'flex';
}

// Close member modal//
function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
}

// Close view member modal//
function closeViewMemberModal() {
    document.getElementById('viewMemberModal').style.display = 'none';
}

// Export members data//
function exportMembers(type) {
    if (type === 'csv') {
        // Export CSV//
        const headers = ['Name', 'Email', 'Phone', 'Membership', 'Join Date', 'End Date', 'Status'];
        const rows = membersData.map(m => [
            m.name,
            m.email,
            m.phone,
            m.membershipType,
            m.joinDate,
            m.endDate,
            m.status === 'active' ? 'Active' : m.status === 'inactive' ? 'Expired' : 'Pending'
        ]);
        
        let csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'members.csv';
        link.click();
        
        showNotification('Data exported successfully', 'success');
    } else {
        showNotification('Preparing PDF file...', 'info');
    }
}