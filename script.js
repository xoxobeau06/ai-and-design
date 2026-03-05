/*
  localStorage keys + data shape
  - p2_overview: { goal1, goal2, goal3, workingDefinition, currentHypothesis, thisWeek }
  - p2_readings: [{ id, title, author, link, tags[], status, notes, dateAdded }]
  - p2_weekly_plan: [{ week, milestones:[{id,text,done}], notes }]
  - p2_prompts: [{ id, prompt, model, summary, changedNext, dateCreated }]
  - p2_experiments: [{ id, tried, artifact, outcome, nextStep, tags[], status, dateCreated }]
  - p2_links: [{ id, label, url, notes }]
  - p2_theme_preference: 'light' | 'dark' | 'system'
  - p2_demo_seeded: 'true' when seed demo data has run once
*/

const KEYS = {
  overview: 'p2_overview', readings: 'p2_readings', weekly: 'p2_weekly_plan',
  prompts: 'p2_prompts', experiments: 'p2_experiments', links: 'p2_links',
  theme: 'p2_theme_preference', seeded: 'p2_demo_seeded'
};

const statusOrder = { 'Not started': 0, 'In progress': 1, 'Completed': 2, Planned: 0, Running: 1, Done: 2 };

const $ = (s) => document.querySelector(s);
const uid = () => crypto.randomUUID();
const load = (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let readings = load(KEYS.readings, []);
let prompts = load(KEYS.prompts, []);
let experiments = load(KEYS.experiments, []);
let links = load(KEYS.links, defaultLinks());
let weekly = load(KEYS.weekly, initWeeks());

function defaultLinks() {
  return [
    { id: uid(), label: 'Milanote board', url: 'https://milanote.com', notes: '' },
    { id: uid(), label: 'GitHub repo', url: 'https://github.com', notes: '' },
    { id: uid(), label: 'AntiGravity', url: 'https://antigravity.ai', notes: '' },
    { id: uid(), label: 'Claude', url: 'https://claude.ai', notes: '' },
    { id: uid(), label: 'Gemini', url: 'https://gemini.google.com', notes: '' },
    { id: uid(), label: 'ChatGPT', url: 'https://chat.openai.com', notes: '' }
  ];
}
function initWeeks() {
  return [5,6,7,8,9,10,11].map((week) => ({ week, milestones: [], notes: '' }));
}

function renderAll() {
  renderReadings(); renderWeekly(); renderPrompts(); renderExperiments(); renderLinks();
  updateProgressMeters();
}

function tagChips(tags = []) { return tags.filter(Boolean).map(t => `<span class="chip">${t}</span>`).join(''); }
function statusClass(s='') { return `status-${s.toLowerCase().replace(/\s+/g,'-')}`; }

/* CRUD: Reading Library */
$('#readingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = $('#readingTitle').value.trim();
  if (!title) return;
  readings.unshift({
    id: uid(), title,
    author: $('#readingAuthor').value.trim(), link: $('#readingLink').value.trim(),
    tags: $('#readingTags').value.split(',').map(s => s.trim()).filter(Boolean),
    status: $('#readingStatus').value, notes: $('#readingNotes').value.trim(),
    dateAdded: new Date().toISOString()
  });
  save(KEYS.readings, readings); e.target.reset(); renderReadings(); updateProgressMeters();
});
function deleteReading(id) { readings = readings.filter(r => r.id !== id); save(KEYS.readings, readings); renderReadings(); updateProgressMeters(); }

function renderReadings() {
  const body = $('#readingTableBody');
  const statusFilter = $('#readingStatusFilter').value;
  const tagFilter = $('#readingTagFilter').value.trim().toLowerCase();
  const sort = $('#readingSort').value;
  const q = $('#globalSearch').value.toLowerCase();

  let data = readings.filter(r =>
    (statusFilter === 'all' || r.status === statusFilter) &&
    (!tagFilter || r.tags.some(t => t.toLowerCase().includes(tagFilter))) &&
    (!q || [r.title, r.author, r.notes, r.status, ...r.tags].join(' ').toLowerCase().includes(q))
  );
  data.sort((a,b) => sort === 'status'
    ? statusOrder[a.status] - statusOrder[b.status]
    : (sort === 'date-asc' ? a.dateAdded.localeCompare(b.dateAdded) : b.dateAdded.localeCompare(a.dateAdded)));

  body.innerHTML = data.map(r => `<tr>
      <td>${r.title}</td><td>${r.author || '-'}</td>
      <td>${r.link ? `<a href="${r.link}" target="_blank" rel="noopener">Open</a>` : '-'}</td>
      <td>${tagChips(r.tags)}</td>
      <td><span class="status-pill ${statusClass(r.status)}">${r.status}</span></td>
      <td>${r.notes || '-'}</td>
      <td><button onclick="deleteReading('${r.id}')">Delete</button></td>
    </tr>`).join('') || '<tr><td colspan="7">No readings match your filters.</td></tr>';
}

/* CRUD: Weekly Plan */
function renderWeekly() {
  $('#weeklyCards').innerHTML = weekly.map((w, idx) => {
    const done = w.milestones.filter(m => m.done).length;
    return `<article class="week-card">
      <h3>Week ${w.week}</h3>
      <p class="meta">${done} / ${w.milestones.length} milestones complete</p>
      <form onsubmit="addMilestone(event, ${idx})">
        <input type="text" name="milestone" placeholder="Add milestone" required />
        <button type="submit">Add</button>
      </form>
      <ul class="week-milestones">
        ${w.milestones.map(m => `<li>
          <input type="checkbox" ${m.done ? 'checked' : ''} onchange="toggleMilestone(${idx}, '${m.id}')" />
          <span>${m.text}</span>
          <button type="button" onclick="removeMilestone(${idx}, '${m.id}')">×</button>
        </li>`).join('')}
      </ul>
      <label>Notes<textarea rows="3" oninput="updateWeekNotes(${idx}, this.value)">${w.notes || ''}</textarea></label>
    </article>`;
  }).join('');
}
function addMilestone(e, idx) {
  e.preventDefault();
  weekly[idx].milestones.push({ id: uid(), text: e.target.milestone.value.trim(), done: false });
  e.target.reset(); save(KEYS.weekly, weekly); renderWeekly(); updateProgressMeters();
}
function toggleMilestone(idx, id) {
  const m = weekly[idx].milestones.find(x => x.id === id); if (!m) return; m.done = !m.done;
  save(KEYS.weekly, weekly); updateProgressMeters(); renderWeekly();
}
function removeMilestone(idx, id) {
  weekly[idx].milestones = weekly[idx].milestones.filter(m => m.id !== id);
  save(KEYS.weekly, weekly); updateProgressMeters(); renderWeekly();
}
function updateWeekNotes(idx, val) { weekly[idx].notes = val; save(KEYS.weekly, weekly); }

/* CRUD: Prompt Log */
$('#promptForm').addEventListener('submit', (e) => {
  e.preventDefault();
  prompts.unshift({
    id: uid(), prompt: $('#promptText').value.trim(), model: $('#promptModel').value,
    summary: $('#promptSummary').value.trim(), changedNext: $('#promptChange').value.trim(),
    dateCreated: new Date().toISOString()
  });
  save(KEYS.prompts, prompts); e.target.reset(); renderPrompts();
});
function deletePrompt(id) { prompts = prompts.filter(p => p.id !== id); save(KEYS.prompts, prompts); renderPrompts(); }
function renderPrompts() {
  const q = $('#globalSearch').value.toLowerCase();
  $('#promptList').innerHTML = prompts.filter(p =>
    !q || [p.prompt, p.model, p.summary, p.changedNext].join(' ').toLowerCase().includes(q)
  ).map(p => `<details class="log-card"><summary>
      <strong>${p.model}</strong> · ${p.summary || 'No summary'} <span class="meta">(${new Date(p.dateCreated).toLocaleDateString()})</span>
    </summary>
    <p><strong>Prompt:</strong><br>${p.prompt || '-'}</p>
    <p><strong>Output summary:</strong><br>${p.summary || '-'}</p>
    <p><strong>What I changed next:</strong><br>${p.changedNext || '-'}</p>
    <button onclick="deletePrompt('${p.id}')">Delete</button>
  </details>`).join('') || '<p>No prompt entries found.</p>';
}

/* CRUD: Experiment Log */
$('#experimentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  experiments.unshift({
    id: uid(), tried: $('#experimentTried').value.trim(), artifact: $('#experimentArtifact').value.trim(),
    outcome: $('#experimentOutcome').value.trim(), nextStep: $('#experimentNext').value.trim(),
    tags: $('#experimentTags').value.split(',').map(s => s.trim()).filter(Boolean), status: $('#experimentStatus').value,
    dateCreated: new Date().toISOString()
  });
  save(KEYS.experiments, experiments); e.target.reset(); renderExperiments();
});
function deleteExperiment(id) { experiments = experiments.filter(x => x.id !== id); save(KEYS.experiments, experiments); renderExperiments(); }
function renderExperiments() {
  const sf = $('#experimentStatusFilter').value;
  const tf = $('#experimentTagFilter').value.toLowerCase();
  const q = $('#globalSearch').value.toLowerCase();
  $('#experimentList').innerHTML = experiments.filter(x =>
    (sf === 'all' || x.status === sf) &&
    (!tf || x.tags.some(t => t.toLowerCase().includes(tf))) &&
    (!q || [x.tried, x.artifact, x.outcome, x.nextStep, ...x.tags].join(' ').toLowerCase().includes(q))
  ).map(x => `<article class="log-card">
      <div><span class="status-pill ${statusClass(x.status)}">${x.status}</span> ${tagChips(x.tags)}</div>
      <p><strong>What I tried:</strong> ${x.tried || '-'}</p>
      <p><strong>Artifact / notes:</strong> ${x.artifact || '-'}</p>
      <p><strong>Outcome:</strong> ${x.outcome || '-'}</p>
      <p><strong>Next step:</strong> ${x.nextStep || '-'}</p>
      <p class="meta">${new Date(x.dateCreated).toLocaleDateString()}</p>
      <button onclick="deleteExperiment('${x.id}')">Delete</button>
    </article>`).join('') || '<p>No experiments found.</p>';
}

/* CRUD: Links */
$('#linkForm').addEventListener('submit', (e) => {
  e.preventDefault();
  links.push({ id: uid(), label: $('#linkLabel').value.trim(), url: $('#linkUrl').value.trim(), notes: $('#linkNotes').value.trim() });
  save(KEYS.links, links); e.target.reset(); renderLinks();
});
function deleteLink(id) { links = links.filter(l => l.id !== id); save(KEYS.links, links); renderLinks(); }
function renderLinks() {
  $('#linksList').innerHTML = links.map(l => `<li>
      <strong>${l.label}</strong> · <a href="${l.url}" target="_blank" rel="noopener">${l.url}</a>
      ${l.notes ? `<div class="meta">${l.notes}</div>` : ''}
      <button onclick="deleteLink('${l.id}')">Delete</button>
    </li>`).join('');
}

function updateProgressMeters() {
  const readingPct = readings.length ? Math.round((readings.filter(r => r.status === 'Completed').length / readings.length) * 100) : 0;
  const allMilestones = weekly.flatMap(w => w.milestones);
  const milestonePct = allMilestones.length ? Math.round((allMilestones.filter(m => m.done).length / allMilestones.length) * 100) : 0;
  $('#readingProgress').value = readingPct; $('#readingProgressLabel').textContent = `${readingPct}%`;
  $('#milestoneProgress').value = milestonePct; $('#milestoneProgressLabel').textContent = `${milestonePct}%`;
}

function setupOverviewPersistence() {
  const overview = load(KEYS.overview, {
    goal1: '', goal2: '', goal3: '', workingDefinition: '', currentHypothesis: '', thisWeek: ''
  });
  ['goal1','goal2','goal3','workingDefinition','currentHypothesis','thisWeekText'].forEach((id) => {
    const el = $(`#${id}`); const key = id === 'thisWeekText' ? 'thisWeek' : id;
    el.value = overview[key] || '';
    el.addEventListener('input', () => { overview[key] = el.value; save(KEYS.overview, overview); });
  });
}

function setupTheme() {
  const select = $('#themeSelect');
  select.value = localStorage.getItem(KEYS.theme) || 'system';
  const apply = (value) => {
    document.documentElement.setAttribute('data-theme', value);
    if (value === 'system') {
      document.documentElement.setAttribute('data-system-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    localStorage.setItem(KEYS.theme, value);
  };
  select.addEventListener('change', () => apply(select.value));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if ((localStorage.getItem(KEYS.theme) || 'system') === 'system') apply('system');
  });
}

function setupFiltersAndSearch() {
  ['#readingStatusFilter', '#readingTagFilter', '#readingSort', '#globalSearch'].forEach(id => $(id).addEventListener('input', () => { renderReadings(); renderPrompts(); renderExperiments(); }));
  ['#experimentStatusFilter', '#experimentTagFilter'].forEach(id => $(id).addEventListener('input', renderExperiments));
}

function setupQuickAdd() {
  $('#quickAddReading').addEventListener('click', () => { location.hash = '#readings'; $('#readingTitle').focus(); });
  $('#quickAddPrompt').addEventListener('click', () => { location.hash = '#prompts'; $('#promptText').focus(); });
  $('#quickAddExperiment').addEventListener('click', () => { location.hash = '#experiments'; $('#experimentTried').focus(); });
}

$('#seedDemoData').addEventListener('click', () => {
  if (localStorage.getItem(KEYS.seeded) === 'true') return alert('Demo data already seeded once.');
  readings = [{ id: uid(), title: 'Designing with Systems', author: 'A. Studio', link: 'https://example.com/system', tags: ['systems','authorship'], status: 'Completed', notes: 'System constraints can reveal voice.', dateAdded: new Date().toISOString() }];
  prompts = [{ id: uid(), prompt: 'Map authorship tensions in AI-assisted workflows.', model: 'ChatGPT', summary: 'Outlined 4 tension clusters.', changedNext: 'Converted clusters into experiment categories.', dateCreated: new Date().toISOString() }];
  experiments = [{ id: uid(), tried: 'Tag-first moodboard taxonomy', artifact: 'Screenshot notes: grouped by intent', outcome: 'Faster early sorting', nextStep: 'Compare against chronology-first sorting', tags: ['taxonomy','workflow'], status: 'Running', dateCreated: new Date().toISOString() }];
  weekly = initWeeks().map((w) => ({ ...w, milestones: [{ id: uid(), text: `Week ${w.week} checkpoint`, done: w.week < 7 }], notes: 'Seed note for planning rhythm.' }));
  save(KEYS.readings, readings); save(KEYS.prompts, prompts); save(KEYS.experiments, experiments); save(KEYS.weekly, weekly);
  localStorage.setItem(KEYS.seeded, 'true'); renderAll();
});

setupOverviewPersistence();
setupTheme();
setupFiltersAndSearch();
setupQuickAdd();
renderAll();
