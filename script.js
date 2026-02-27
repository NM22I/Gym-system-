// ===== script.js - دوال صفحة تسجيل الدخول فقط =====

// متغيرات عامة
let currentStep = 1;
let selectedPlan = null;

// ===== التهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة تسجيل الدخول جاهزة');
});

// ===== دوال التبويبات =====

// تبديل بين تبويبات تسجيل الدخول وإنشاء حساب
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

// ===== دوال تسجيل الدخول =====

// اختيار طريقة تسجيل الدخول
function selectLoginMethod(method) {
    document.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
    document.getElementById(method + '-option').classList.add('active');
    
    document.querySelectorAll('.login-field').forEach(f => f.classList.remove('active'));
    document.getElementById(method + '-login').classList.add('active');
}

// إظهار/إخفاء كلمة المرور
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

// معالجة تسجيل الدخول
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

// ===== دوال إنشاء الحساب =====

// تحديث قوة كلمة المرور
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

// التنقل بين خطوات التسجيل
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

// التحقق من صحة كل خطوة
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

// اختيار خطة العضوية
function selectPlan(plan) {
    selectedPlan = plan;
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('plan-' + plan)?.classList.add('selected');
}

// معالجة إنشاء حساب
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

// ===== دوال نافذة نسيت كلمة المرور =====

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

// ===== تسجيل الدخول عبر وسائل التواصل =====

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

// ===== دوال مساعدة =====

// إظهار الإشعارات
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

// إظهار التحميل
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

// إخفاء التحميل
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}


// ===== دوال لوحة التحكم (تضاف في نهاية الملف) =====

// التحقق من تسجيل الدخول عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('2-dashboard.html')) {
        checkAuth();
        loadUserData();
        highlightActiveMenu();
        updateDateTime();
    }
});

// التحقق من تسجيل الدخول
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '1-login.html';
    }
}

// تحميل بيانات المستخدم
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = userData.name || 'أحمد محمد';
    });
    
    document.querySelectorAll('.user-membership').forEach(el => {
        el.textContent = userData.membership || 'عضوية احترافية';
    });
    
    // تحديث اسم المستخدم في الترحيب
    const welcomeName = document.getElementById('welcomeUserName');
    if (welcomeName) {
        const firstName = (userData.name || 'أحمد').split(' ')[0];
        welcomeName.textContent = firstName;
    }
}

// تفعيل الرابط النشط في القائمة
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// تبديل قائمة المستخدم
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const menu = document.getElementById('userMenu');
    const button = document.querySelector('.user-dropdown');
    
    if (menu && button && !button.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// تسجيل الخروج
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        showNotification('تم تسجيل الخروج بنجاح', 'success');
        setTimeout(() => {
            window.location.href = '1-login.html';
        }, 1000);
    }
}

// تحديث التاريخ والوقت
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

// تحديث التاريخ كل دقيقة
setInterval(updateDateTime, 60000);

// دوال مؤقتة للصفحات الأخرى (سنكملها لاحقاً)
function viewAllBookings() {
    alert('سيتم فتح صفحة جميع الحجوزات');
}

function addMember() {
    alert('فتح نموذج إضافة عضو جديد');
}

function bookClass(classId) {
    alert('تم حجز الحصة رقم: ' + classId);
}

// ===== دوال إظهار وإخفاء القائمة الجانبية =====

// تبديل حالة القائمة الجانبية
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleIcon = document.querySelector('.menu-toggle i');
    
    if (window.innerWidth <= 768) {
        // للشاشات الصغيرة
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // منع التمرير عند فتح القائمة
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        // للشاشات الكبيرة
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
        
        // تغيير شكل الأيقونة
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
        } else {
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
        }
    }
}

// إغلاق القائمة عند النقر على الطبقة الخلفية
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// تحديث حالة القائمة عند تغيير حجم الشاشة
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    const toggleIcon = document.querySelector('.menu-toggle i');
    
    if (window.innerWidth > 768) {
        // للشاشات الكبيرة
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

// منع إغلاق القائمة عند النقر داخلها
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});
// ===== دوال الإشعارات =====

// بيانات تجريبية للإشعارات
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

// تبديل قائمة الإشعارات
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    dropdown.classList.toggle('show');
    loadNotifications();
    
    // إغلاق قائمة المستخدم إذا كانت مفتوحة
    const userMenu = document.getElementById('userMenu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    }
}

// تحميل الإشعارات
function loadNotifications() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    
    // حساب عدد الإشعارات غير المقروءة
    const unreadCount = notifications.filter(n => !n.read).length;
    updateNotificationBadge(unreadCount);
    
    // عرض الإشعارات
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

// تحديث شارة الإشعارات
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

// تحديد الإشعار كمقروء
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        loadNotifications();
        showNotification('تم تحديد الإشعار كمقروء', 'info');
    }
}

// تحديد الكل كمقروء
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    loadNotifications();
    showNotification('تم تحديد جميع الإشعارات كمقروءة', 'success');
}

// إضافة إشعار جديد
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
    
    // إظهار رسالة منبثقة
    showNotification('🔔 إشعار جديد: ' + title, 'info');
}

// محاكاة إشعارات جديدة كل دقيقة
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
    
    // 30% فرصة لظهور إشعار جديد كل دقيقة
    if (Math.random() < 0.3) {
        const random = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        addNotification(random.title, random.description, random.icon, random.color);
    }
}, 60000); // كل دقيقة

// إغلاق الإشعارات عند النقر خارجها
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notificationsDropdown');
    const bell = document.querySelector('.notifications');
    
    if (dropdown && bell && !bell.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});