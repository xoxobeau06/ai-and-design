// Default data structure if local storage is empty
const defaultData = {
    panels: [
        {
            id: 'panel-1',
            name: 'Home',
            categories: [
                {
                    id: 'cat-1',
                    name: 'Daily',
                    links: [
                        { id: 'link-1', name: 'Gmail', url: 'https://mail.google.com' },
                        { id: 'link-2', name: 'Calendar', url: 'https://calendar.google.com' }
                    ]
                }
            ]
        },
        {
            id: 'panel-2',
            name: 'Inspiration',
            categories: [
                {
                    id: 'cat-2',
                    name: 'Aesthetic',
                    links: [
                        { id: 'link-3', name: 'Pinterest', url: 'https://pinterest.com' },
                        { id: 'link-4', name: 'Tumblr', url: 'https://tumblr.com' }
                    ]
                }
            ]
        }
    ]
};

// State
let appData = JSON.parse(localStorage.getItem('dashboardData')) || defaultData;

// Migrate old data structure (flat categories) to new structure (panels) transparently
if (!appData.panels && appData.categories) {
    appData = {
        panels: [
            {
                id: 'panel-' + generateId(),
                name: 'Main',
                categories: appData.categories
            }
        ]
    };
    localStorage.setItem('dashboardData', JSON.stringify(appData));
}

let activePanelId = appData.panels.length > 0 ? appData.panels[0].id : null;
let editingLinkId = null;
let isUnlocked = localStorage.getItem('dashboardUnlocked') === 'true';

// DOM Elements
const dashboard = document.getElementById('dashboard');
const greetingEl = document.getElementById('greeting');
const panelSwitcher = document.getElementById('panel-switcher');
const themeSelect = document.getElementById('theme-select');

// Modals
const linkModal = document.getElementById('link-modal');
const categoryModal = document.getElementById('category-modal');
const panelModal = document.getElementById('panel-modal');
const loginModal = document.getElementById('login-modal');

// Buttons
const addCategoryBtn = document.getElementById('add-category-btn');
const addLinkBtn = document.getElementById('add-link-btn');
const addPanelBtn = document.getElementById('add-panel-btn');
const lockBtn = document.getElementById('lock-btn');

// Forms
const linkForm = document.getElementById('link-form');
const categoryForm = document.getElementById('category-form');
const panelForm = document.getElementById('panel-form');
const loginForm = document.getElementById('login-form');

// Inputs
const linkIdInput = document.getElementById('link-id');
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linkDescInput = document.getElementById('link-desc');
const linkDueDateInput = document.getElementById('link-dueDate');
const linkCategoryInput = document.getElementById('link-category');
const categoryNameInput = document.getElementById('category-name');
const panelNameInput = document.getElementById('panel-name');
const loginPasswordInput = document.getElementById('login-password');

// Initialize
function init() {
    setGreeting();
    initTheme();
    updateLockState();
    renderPanelSwitcher();
    renderDashboard();
    setupEventListeners();
}

function updateLockState() {
    if (isUnlocked) {
        document.body.classList.remove('locked-mode');
        if (lockBtn) lockBtn.textContent = '🔓';
        if (lockBtn) lockBtn.title = 'Lock Edit Mode';
    } else {
        document.body.classList.add('locked-mode');
        if (lockBtn) lockBtn.textContent = '🔒';
        if (lockBtn) lockBtn.title = 'Unlock Edit Mode';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('dashboardTheme') || 'system';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    document.documentElement.classList.remove('dark-theme', 'light-theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    } else if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
    }
}

function saveData(shouldRender = true) {
    localStorage.setItem('dashboardData', JSON.stringify(appData));
    if (shouldRender) {
        renderPanelSwitcher();
        renderDashboard();
    }
}

// Set time-based greeting
function setGreeting() {
    const hour = new Date().getHours();
    let greting = 'Good evening.';
    if (hour >= 5 && hour < 12) greting = 'Good morning.';
    else if (hour >= 12 && hour < 17) greting = 'Good afternoon.';
    greetingEl.textContent = greting;
}

// Render Panel Switcher Tabs
function renderPanelSwitcher() {
    panelSwitcher.innerHTML = '';

    appData.panels.forEach(panel => {
        const btn = document.createElement('button');
        btn.className = `panel-tab ${panel.id === activePanelId ? 'active' : ''}`;

        const titleSpan = document.createElement('span');
        titleSpan.textContent = panel.name;

        // Let user easily switch panels
        btn.onclick = () => {
            activePanelId = panel.id;
            renderPanelSwitcher();
            renderDashboard();
        };

        // Prevent deleting the last panel, otherwise render delete button
        if (appData.panels.length > 1) {
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-panel';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete Panel';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                deletePanel(panel.id);
            };
            btn.appendChild(titleSpan);
            btn.appendChild(deleteBtn);
        } else {
            btn.appendChild(titleSpan);
        }

        panelSwitcher.appendChild(btn);
    });
}

// Get the currently active panel object
function getActivePanel() {
    return appData.panels.find(p => p.id === activePanelId);
}

// Render the dashboard grid based on active panel
function renderDashboard() {
    dashboard.innerHTML = '';
    const panel = getActivePanel();

    if (!panel || panel.categories.length === 0) {
        dashboard.innerHTML = `
            <div class="empty-state">
                <h3>Welcome to ${panel ? escapeHTML(panel.name) : 'your Dashboard'}</h3>
                <p>Start by adding a category, then add some links.</p>
                <button class="btn btn-secondary" onclick="openCategoryModal()">Create First Category</button>
            </div>
        `;
        return;
    }

    // 1. Build DOM Elements First so we can attach Sortable
    panel.categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.categoryId = category.id;

        // Render Links
        let listItems = '';
        if (category.links.length === 0) {
            listItems = '<div class="empty-list-placeholder" style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0; pointer-events: none;">Drop links here</div>';
        } else {
            listItems = category.links.map(link => {
                return `
                <div class="link-item ${link.completed ? 'completed' : ''}" data-link-id="${link.id}">
                    <div class="drag-handle link-drag-handle" title="Drag to reorder link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                    </div>
                    ${link.dueDate || !link.url ? `
                    <button class="checkbox-btn ${link.completed ? 'checked' : ''}" onclick="toggleTask('${category.id}', '${link.id}')" title="Mark as done">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    ` : ''}
                    ${link.url ? `<a href="${link.url}" class="link-content" target="_blank" rel="noopener noreferrer">` : `<div class="link-content">`}
                        ${link.url ? `<img class="link-icon" src="https://www.google.com/s2/favicons?domain=${getDomain(link.url)}&sz=64" alt="" loading="lazy">` : `<div class="link-icon task-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>`}
                        <div class="link-text-container">
                            <span class="link-name">${escapeHTML(link.name)}</span>
                            ${link.description || link.dueDate ? `
                            <div class="link-meta">
                                ${link.dueDate ? `<span class="link-dueDate">📅 ${escapeHTML(link.dueDate)}</span>` : ''}
                                ${link.description ? `<span class="link-desc" style="margin-top:0;">${escapeHTML(link.description)}</span>` : ''}
                            </div>
                            ` : ''}
                        </div>
                    ${link.url ? `</a>` : `</div>`}
                    <div class="link-actions">
                        <button class="action-icon" onclick="openEditLinkModal('${category.id}', '${link.id}')" title="Edit">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="action-icon delete" onclick="deleteLink('${category.id}', '${link.id}')" title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
            `;
            }).join('');
        }

        let linksHtml = `<div class="link-list" style="min-height: 40px;">${listItems}</div>`;

        card.innerHTML = `
            <div class="category-header">
                <div class="drag-handle category-drag-handle" title="Drag to reorder category">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                </div>
                <h2>${escapeHTML(category.name)}</h2>
                <div style="flex:1;"></div>
                <button class="btn-icon-danger" onclick="deleteCategory('${category.id}')" title="Delete Category">Delete</button>
            </div>
            ${linksHtml}
        `;
        dashboard.appendChild(card);
    });

    // 2. Initialize SortableJS
    // Categories Sortable
    if (typeof Sortable !== 'undefined') {
        new Sortable(dashboard, {
            handle: '.category-drag-handle',
            disabled: !isUnlocked,
            animation: 200,
            ghostClass: 'sortable-ghost',
            onEnd: function () {
                const currentPanel = getActivePanel();
                if (!currentPanel) return;

                // Reconstruct category array order based on DOM
                const newCategoryOrder = Array.from(dashboard.children)
                    .map(el => el.dataset.categoryId)
                    .filter(Boolean);

                currentPanel.categories = newCategoryOrder
                    .map(id => currentPanel.categories.find(c => c.id === id))
                    .filter(Boolean);

                saveData(false); // Save without re-rendering to prevent stuttering
            }
        });

        // Links Sortable (allows crossing categories)
        const linkLists = dashboard.querySelectorAll('.link-list');
        linkLists.forEach(listContainer => {
            new Sortable(listContainer, {
                group: 'shared-links', // Allow dragging links between different categories
                handle: '.link-drag-handle',
                disabled: !isUnlocked,
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: function () {
                    const currentPanel = getActivePanel();
                    if (!currentPanel) return;

                    // We must rebuild ALL categories' link arrays based on DOM state
                    // to account for links dropped across category boundaries
                    const categoryCards = dashboard.querySelectorAll('.category-card');
                    categoryCards.forEach(card => {
                        const catId = card.dataset.categoryId;
                        const catData = currentPanel.categories.find(c => c.id === catId);
                        if (catData) {
                            const linkEls = card.querySelectorAll('.link-item');
                            const newLinks = [];

                            linkEls.forEach(el => {
                                const linkId = el.dataset.linkId;
                                // Find this link's original data across the entire panel
                                let originalLinkData = null;
                                for (const c of currentPanel.categories) {
                                    const found = c.links.find(l => l.id === linkId);
                                    if (found) { originalLinkData = found; break; }
                                }
                                if (originalLinkData) {
                                    newLinks.push(originalLinkData);
                                }
                            });
                            catData.links = newLinks;
                        }
                    });

                    saveData(false); // Save cleanly behind the scenes
                }
            });
        });
    }

    populateCategorySelects();
}

function getDomain(url) {
    if (!url) return '';
    try {
        return new URL(url).hostname;
    } catch (e) {
        return url;
    }
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag])
    );
}

// Event Listeners
function setupEventListeners() {
    // Theme
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        localStorage.setItem('dashboardTheme', theme);
        applyTheme(theme);
    });

    // Buttons
    addCategoryBtn.addEventListener('click', openCategoryModal);
    addLinkBtn.addEventListener('click', openAddLinkModal);
    addPanelBtn.addEventListener('click', openPanelModal);

    lockBtn.addEventListener('click', () => {
        if (isUnlocked) {
            isUnlocked = false;
            localStorage.setItem('dashboardUnlocked', 'false');
            updateLockState();
            renderDashboard();
        } else {
            loginForm.reset();
            loginModal.classList.add('active');
            setTimeout(() => loginPasswordInput.focus(), 100);
        }
    });

    // Modal Close Buttons
    document.getElementById('close-link-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-link-btn').addEventListener('click', closeModal);
    document.getElementById('close-category-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-category-btn').addEventListener('click', closeModal);
    document.getElementById('close-panel-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-panel-btn').addEventListener('click', closeModal);
    document.getElementById('close-login-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-login-btn').addEventListener('click', closeModal);

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === linkModal || e.target === categoryModal || e.target === panelModal || e.target === loginModal) {
            closeModal();
        }
    });

    // Keyboard shortcuts for switching panels
    window.addEventListener('keydown', (e) => {
        // Ignore if user is typing in an input, textarea, or select
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
            return;
        }

        const key = e.key;
        // Check if key is a number between 1 and 9
        if (/^[1-9]$/.test(key)) {
            const index = parseInt(key) - 1;
            if (index >= 0 && index < appData.panels.length) {
                activePanelId = appData.panels[index].id;
                renderPanelSwitcher();
                renderDashboard();
            }
        }
    });

    // Forms
    categoryForm.addEventListener('submit', handleCategorySubmit);
    linkForm.addEventListener('submit', handleLinkSubmit);
    panelForm.addEventListener('submit', handlePanelSubmit);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = loginPasswordInput.value.trim();
        if (pwd === 'password') {
            isUnlocked = true;
            localStorage.setItem('dashboardUnlocked', 'true');
            updateLockState();
            renderDashboard();
            closeModal();
        } else {
            alert('Incorrect password!');
        }
    });
}

function populateCategorySelects() {
    const panel = getActivePanel();
    linkCategoryInput.innerHTML = '';
    if (!panel) return;

    panel.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        linkCategoryInput.appendChild(option);
    });
}

// Modal Handlers
window.openCategoryModal = function () {
    categoryForm.reset();
    categoryModal.classList.add('active');
    setTimeout(() => categoryNameInput.focus(), 100);
}

window.openAddLinkModal = function () {
    const panel = getActivePanel();
    if (!panel || panel.categories.length === 0) {
        alert("Please create a category first.");
        openCategoryModal();
        return;
    }

    editingLinkId = null;
    document.getElementById('link-modal-title').textContent = 'Add a new link';
    linkForm.reset();
    populateCategorySelects();
    linkModal.classList.add('active');
    setTimeout(() => linkNameInput.focus(), 100);
}

window.openPanelModal = function () {
    panelForm.reset();
    panelModal.classList.add('active');
    setTimeout(() => panelNameInput.focus(), 100);
}

window.openEditLinkModal = function (categoryId, linkId) {
    const panel = getActivePanel();
    const category = panel.categories.find(c => c.id === categoryId);
    if (!category) return;

    const link = category.links.find(l => l.id === linkId);
    if (!link) return;

    editingLinkId = { catId: categoryId, id: linkId };

    document.getElementById('link-modal-title').textContent = 'Edit Item';
    linkIdInput.value = link.id;
    linkNameInput.value = link.name;
    linkUrlInput.value = link.url || '';
    linkDescInput.value = link.description || '';
    linkDueDateInput.value = link.dueDate || '';
    populateCategorySelects();
    linkCategoryInput.value = categoryId;

    linkModal.classList.add('active');
    setTimeout(() => linkNameInput.focus(), 100);
}

function closeModal() {
    linkModal.classList.remove('active');
    categoryModal.classList.remove('active');
    panelModal.classList.remove('active');
    loginModal.classList.remove('active');
}

// Form Submit Handlers
function handlePanelSubmit(e) {
    e.preventDefault();
    const name = panelNameInput.value.trim();
    if (!name) return;

    const newPanel = {
        id: 'panel-' + generateId(),
        name: name,
        categories: []
    };

    appData.panels.push(newPanel);
    activePanelId = newPanel.id; // Switch to it immediately
    saveData();
    closeModal();
}

function handleCategorySubmit(e) {
    e.preventDefault();
    const name = categoryNameInput.value.trim();
    const panel = getActivePanel();

    if (!name || !panel) return;

    panel.categories.push({
        id: 'cat-' + generateId(),
        name: name,
        links: []
    });

    saveData();
    closeModal();
}

function handleLinkSubmit(e) {
    e.preventDefault();
    const panel = getActivePanel();

    let url = linkUrlInput.value.trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }

    const name = linkNameInput.value.trim();
    const targetCatId = linkCategoryInput.value;
    const desc = linkDescInput.value.trim();
    const dueDateText = linkDueDateInput.value.trim();

    if (!name || !targetCatId || !panel) return;

    if (editingLinkId) {
        // Editing existing
        // Remove from old category if changed
        if (editingLinkId.catId !== targetCatId) {
            const sourceCat = panel.categories.find(c => c.id === editingLinkId.catId);
            const linkIndex = sourceCat.links.findIndex(l => l.id === editingLinkId.id);
            const [link] = sourceCat.links.splice(linkIndex, 1);

            link.name = name;
            link.url = url;
            link.description = desc;
            link.dueDate = dueDateText;

            const targetCat = panel.categories.find(c => c.id === targetCatId);
            targetCat.links.push(link);
        } else {
            // Update in place
            const cat = panel.categories.find(c => c.id === targetCatId);
            const link = cat.links.find(l => l.id === editingLinkId.id);
            link.name = name;
            link.url = url;
            link.description = desc;
            link.dueDate = dueDateText;
        }
    } else {
        // Adding new
        const targetCat = panel.categories.find(c => c.id === targetCatId);
        targetCat.links.push({
            id: 'link-' + generateId(),
            name: name,
            url: url,
            description: desc,
            dueDate: dueDateText,
            completed: false
        });
    }

    saveData();
    closeModal();
}

window.toggleTask = function (categoryId, linkId) {
    const panel = getActivePanel();
    if (!panel) return;
    const category = panel.categories.find(c => c.id === categoryId);
    if (!category) return;
    const link = category.links.find(l => l.id === linkId);
    if (!link) return;

    link.completed = !link.completed;
    saveData();
}

// Delete Handlers
window.deletePanel = function (panelId) {
    if (confirm("Are you sure you want to delete this Entire Panel and ALL of its categories and links?")) {
        appData.panels = appData.panels.filter(p => p.id !== panelId);
        // Fallback to the first available panel
        if (appData.panels.length > 0) {
            activePanelId = appData.panels[0].id;
        } else {
            activePanelId = null;
        }
        saveData();
    }
}

window.deleteCategory = function (categoryId) {
    if (confirm("Are you sure you want to delete this category and all its links?")) {
        const panel = getActivePanel();
        panel.categories = panel.categories.filter(c => c.id !== categoryId);
        saveData();
    }
}

window.deleteLink = function (categoryId, linkId) {
    if (confirm("Delete this link?")) {
        const panel = getActivePanel();
        const category = panel.categories.find(c => c.id === categoryId);
        category.links = category.links.filter(l => l.id !== linkId);
        saveData();
    }
}

// Bootstrap
init();
