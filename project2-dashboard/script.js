/**
 * Project 2 Command Center - Application Logic
 *
 * Handles reading/writing to localStorage, DOM manipulation,
 * CRUD for various collections, and global search.
 */

// --- Constants & Keys ---
const KEYS = {
  THEME: "p2_theme",
  THIS_WEEK: "p2_this_week",
  OVERVIEW: "p2_overview", // { workingDef, hypothesis, goals: [] }
  READINGS: "p2_readings", // Array of reading objects
  WEEKLY_PLAN: "p2_weekly_plan", // Object keyed by week num: { milestones: [{id, text, done}], notes: '' }
  PROMPTS: "p2_prompts", // Array of prompt objects
  EXPERIMENTS: "p2_experiments", // Array of experiment objects
  LINKS: "p2_links", // Array of link objects
  SEEDED: "p2_seeded", // Boolean flag to avoid double seeding
};

// --- Storage Utilities ---
const loadData = (key, defaultVal) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultVal;
};

const saveData = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
  updateProgress(); // globally trigger progress updates when data changes
};

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSidebar();
  initOverview();
  initReadings();
  initWeeklyPlan();
  initPrompts();
  initExperiments();
  initLinks();
  initGlobalSearch();
  initModals();
  updateProgress();

  document
    .getElementById("seed-demo-btn")
    .addEventListener("click", seedDemoData);
});

// --- Theme ---
const initTheme = () => {
  const themeSelect = document.getElementById("theme-select");
  const savedTheme = localStorage.getItem(KEYS.THEME) || "system";
  themeSelect.value = savedTheme;

  themeSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    localStorage.setItem(KEYS.THEME, val);
    if (
      val === "dark" ||
      (val === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  });

  // Listen for system changes if system theme picked
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem(KEYS.THEME) === "system") {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light",
        );
      }
    });
};

// --- Sidebar ---
const initSidebar = () => {
  const thisWeekText = document.getElementById("this-week-text");
  thisWeekText.value = loadData(KEYS.THIS_WEEK, "");

  thisWeekText.addEventListener("input", (e) => {
    saveData(KEYS.THIS_WEEK, e.target.value);
  });
};

// --- Overview (Definition, Hypothesis, Goals) ---
const initOverview = () => {
  const defaultOverview = { workingDef: "", hypothesis: "", goals: [] };
  const overviewData = loadData(KEYS.OVERVIEW, defaultOverview);

  const defEl = document.getElementById("working-definition");
  const hypEl = document.getElementById("current-hypothesis");
  const goalsEl = document.getElementById("goals-list");

  defEl.value = overviewData.workingDef;
  hypEl.value = overviewData.hypothesis;

  defEl.addEventListener("input", (e) => {
    overviewData.workingDef = e.target.value;
    saveData(KEYS.OVERVIEW, overviewData);
  });

  hypEl.addEventListener("input", (e) => {
    overviewData.hypothesis = e.target.value;
    saveData(KEYS.OVERVIEW, overviewData);
  });

  const renderGoals = () => {
    goalsEl.innerHTML = "";
    overviewData.goals.forEach((goal, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="text" value="${goal.replace(/"/g, "&quot;")}" data-idx="${idx}" class="goal-input" />
        <button class="remove-btn" data-idx="${idx}">&times;</button>
      `;
      goalsEl.appendChild(li);
    });

    // Add empty row for new goal
    if (overviewData.goals.length < 3) {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="text" placeholder="Add a new goal..." class="new-goal-input" />
      `;
      goalsEl.appendChild(li);
    }

    // Bind events
    goalsEl.querySelectorAll(".goal-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const idx = e.target.getAttribute("data-idx");
        overviewData.goals[idx] = e.target.value;
        saveData(KEYS.OVERVIEW, overviewData);
        renderGoals();
      });
    });

    goalsEl.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-idx");
        overviewData.goals.splice(idx, 1);
        saveData(KEYS.OVERVIEW, overviewData);
        renderGoals();
      });
    });

    const newGoalInput = goalsEl.querySelector(".new-goal-input");
    if (newGoalInput) {
      newGoalInput.addEventListener("change", (e) => {
        if (e.target.value.trim()) {
          overviewData.goals.push(e.target.value.trim());
          saveData(KEYS.OVERVIEW, overviewData);
          renderGoals();
        }
      });
    }
  };

  renderGoals();
};

// --- Progress Mini-meters ---
const updateProgress = () => {
  // Readings
  const readings = loadData(KEYS.READINGS, []);
  let rTotal = readings.length;
  let rDone = readings.filter((r) => r.status === "Completed").length;
  let rPct = rTotal === 0 ? 0 : Math.round((rDone / rTotal) * 100);

  document.getElementById("readings-pct").innerText = `${rPct}%`;
  document.getElementById("readings-progress").style.width = `${rPct}%`;

  // Milestones
  const plan = loadData(KEYS.WEEKLY_PLAN, {});
  let mTotal = 0;
  let mDone = 0;
  Object.values(plan).forEach((week) => {
    if (week.milestones) {
      mTotal += week.milestones.length;
      mDone += week.milestones.filter((m) => m.done).length;
    }
  });
  let mPct = mTotal === 0 ? 0 : Math.round((mDone / mTotal) * 100);

  document.getElementById("milestones-pct").innerText = `${mPct}%`;
  document.getElementById("milestones-progress").style.width = `${mPct}%`;

  const statsEl = document.getElementById("weekly-overview-stats");
  if (statsEl) {
    statsEl.innerText = `${mDone} / ${mTotal} milestones complete`;
  }
};

// --- Tags Helper ---
const renderTags = (tagsStr) => {
  if (!tagsStr) return "";
  return tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t)
    .map((t) => `<span class="tag-chip">${t}</span>`)
    .join("");
};

const getStatusColor = (status) => {
  const map = {
    "Not started": "var(--status-not-started)",
    "In progress": "var(--status-in-progress)",
    Completed: "var(--status-completed)",
    Planned: "var(--status-planned)",
    Running: "var(--status-running)",
    Done: "var(--status-done)",
  };
  return map[status] || "var(--status-not-started)";
};

// --- Readings ---
const initReadings = () => {
  const listEl = document.getElementById("reading-list");
  const filterEl = document.getElementById("filter-reading-status");

  const render = () => {
    let readings = loadData(KEYS.READINGS, []);
    const filter = filterEl.value;
    if (filter !== "all") {
      readings = readings.filter((r) => r.status === filter);
    }

    // Sort Date added desc
    readings.sort((a, b) => b.createdAt - a.createdAt);

    listEl.innerHTML = "";
    readings.forEach((r) => {
      const card = document.createElement("div");
      card.className = "card search-item";
      card.setAttribute(
        "data-searchable",
        `${r.title} ${r.author} ${r.tags}`.toLowerCase(),
      );

      card.innerHTML = `
        <div class="reading-item">
          <div class="title">${r.link ? `<a href="${r.link}" target="_blank">${r.title}</a>` : r.title}</div>
          <div class="author">${r.author || "Unknown Author"}</div>
          <div class="tags">${renderTags(r.tags)}</div>
          <div class="status">
            <span class="status-pill" style="background-color: ${getStatusColor(r.status)}; color: var(--text-on-pastel)">${r.status}</span>
          </div>
          <div class="actions">
            <button class="btn btn-secondary btn-small edit-reading-btn" data-id="${r.id}">Edit</button>
            <button class="remove-btn delete-reading-btn" data-id="${r.id}">&times;</button>
          </div>
        </div>
        ${r.notes ? `<div style="margin-top:8px; font-size:0.9rem; color:var(--text-muted)">📝 ${r.notes.substring(0, 100)}${r.notes.length > 100 ? "..." : ""}</div>` : ""}
      `;
      listEl.appendChild(card);
    });

    // Bind Edit/Delete
    listEl.querySelectorAll(".edit-reading-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        openReadingModal(e.target.getAttribute("data-id")),
      );
    });
    listEl.querySelectorAll(".delete-reading-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (confirm("Delete this reading?")) {
          const id = e.target.getAttribute("data-id");
          saveData(
            KEYS.READINGS,
            loadData(KEYS.READINGS, []).filter((r) => r.id !== id),
          );
          render();
        }
      });
    });
  };

  filterEl.addEventListener("change", render);
  document
    .getElementById("btn-add-reading")
    .addEventListener("click", () => openReadingModal());

  // Attach to global window to re-render externally
  window._renderReadings = render;
  render();
};

const openReadingModal = (id = null) => {
  const readings = loadData(KEYS.READINGS, []);
  const reading = id
    ? readings.find((r) => r.id === id)
    : {
        title: "",
        author: "",
        link: "",
        tags: "",
        status: "Not started",
        notes: "",
      };

  const html = `
    <div class="form-group">
      <label>Title *</label>
      <input type="text" id="m-read-title" value="${reading.title || ""}" required>
    </div>
    <div class="form-row">
      <div class="form-group half">
        <label>Author / Org</label>
        <input type="text" id="m-read-author" value="${reading.author || ""}">
      </div>
      <div class="form-group half">
        <label>Status</label>
        <select id="m-read-status">
          <option value="Not started" ${reading.status === "Not started" ? "selected" : ""}>Not started</option>
          <option value="In progress" ${reading.status === "In progress" ? "selected" : ""}>In progress</option>
          <option value="Completed" ${reading.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label>Link (URL)</label>
      <input type="url" id="m-read-link" value="${reading.link || ""}">
    </div>
    <div class="form-group">
      <label>Tags (comma-separated)</label>
      <input type="text" id="m-read-tags" value="${reading.tags || ""}" placeholder="e.g. system design, ai">
    </div>
    <div class="form-group">
      <label>Notes</label>
      <textarea id="m-read-notes">${reading.notes || ""}</textarea>
    </div>
  `;

  openModal(id ? "Edit Reading" : "Add Reading", html, () => {
    const title = document.getElementById("m-read-title").value.trim();
    if (!title) return alert("Title is required");

    const newReading = {
      id: id || generateId(),
      title,
      author: document.getElementById("m-read-author").value,
      status: document.getElementById("m-read-status").value,
      link: document.getElementById("m-read-link").value,
      tags: document.getElementById("m-read-tags").value,
      notes: document.getElementById("m-read-notes").value,
      createdAt: reading.createdAt || Date.now(),
    };

    if (id) {
      const idx = readings.findIndex((r) => r.id === id);
      readings[idx] = newReading;
    } else {
      readings.push(newReading);
    }

    saveData(KEYS.READINGS, readings);
    window._renderReadings();
    closeModal();
  });
};

// --- Weekly Plan ---
const initWeeklyPlan = () => {
  const gridEl = document.getElementById("weekly-grid");

  const render = () => {
    let plan = loadData(KEYS.WEEKLY_PLAN, {});
    gridEl.innerHTML = "";

    // Weeks 5-11
    for (let i = 5; i <= 11; i++) {
      if (!plan[i]) plan[i] = { milestones: [], notes: "" };
      const wk = plan[i];

      const card = document.createElement("div");
      card.className = "weekly-card";

      let milestonesHtml = wk.milestones
        .map(
          (m, idx) => `
        <div class="milestone-item">
          <input type="checkbox" class="milestone-checkbox" data-week="${i}" data-idx="${idx}" ${m.done ? "checked" : ""}>
          <input type="text" class="milestone-text" data-week="${i}" data-idx="${idx}" value="${m.text.replace(/"/g, "&quot;")}" placeholder="Milestone...">
          <button class="remove-btn remove-milestone-btn" data-week="${i}" data-idx="${idx}" style="font-size:0.9rem; margin-top:2px;">&times;</button>
        </div>
      `,
        )
        .join("");

      card.innerHTML = `
        <h4>Week ${i}</h4>
        <div class="milestones-container" id="milestones-w${i}">
          ${milestonesHtml}
        </div>
        <button class="add-milestone-btn" data-week="${i}">+ Add Milestone</button>
        <textarea class="weekly-notes" data-week="${i}" placeholder="Notes for week ${i}..." style="margin-top:8px; min-height:60px; font-size:0.85rem">${wk.notes}</textarea>
      `;
      gridEl.appendChild(card);
    }

    // Bind Weekly Events
    gridEl.querySelectorAll(".milestone-checkbox").forEach((cb) => {
      cb.addEventListener("change", (e) => {
        const w = e.target.getAttribute("data-week");
        const idx = e.target.getAttribute("data-idx");
        plan[w].milestones[idx].done = e.target.checked;
        saveData(KEYS.WEEKLY_PLAN, plan);
      });
    });

    gridEl.querySelectorAll(".milestone-text").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const w = e.target.getAttribute("data-week");
        const idx = e.target.getAttribute("data-idx");
        plan[w].milestones[idx].text = e.target.value;
        saveData(KEYS.WEEKLY_PLAN, plan);
      });
    });

    gridEl.querySelectorAll(".remove-milestone-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const w = e.target.getAttribute("data-week");
        const idx = e.target.getAttribute("data-idx");
        plan[w].milestones.splice(idx, 1);
        saveData(KEYS.WEEKLY_PLAN, plan);
        render(); // re-render that specific UI section safely by just full re-render
      });
    });

    gridEl.querySelectorAll(".add-milestone-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const w = e.target.getAttribute("data-week");
        plan[w].milestones.push({ text: "", done: false });
        saveData(KEYS.WEEKLY_PLAN, plan);
        render();
      });
    });

    gridEl.querySelectorAll(".weekly-notes").forEach((textarea) => {
      textarea.addEventListener("change", (e) => {
        const w = e.target.getAttribute("data-week");
        plan[w].notes = e.target.value;
        saveData(KEYS.WEEKLY_PLAN, plan);
      });
    });
  };

  window._renderWeeklyPlan = render;
  render();
};

// --- Prompts ---
const initPrompts = () => {
  const listEl = document.getElementById("prompt-list");

  const render = () => {
    let prompts = loadData(KEYS.PROMPTS, []);
    prompts.sort((a, b) => b.createdAt - a.createdAt);

    listEl.innerHTML = "";
    prompts.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card search-item";
      const dateStr = new Date(p.createdAt).toLocaleDateString();
      card.setAttribute(
        "data-searchable",
        `${p.prompt} ${p.model} ${p.summary}`.toLowerCase(),
      );

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="status-pill" style="background-color: var(--accent-secondary); color: var(--text-on-pastel)">${p.model}</span>
            <span style="font-size:0.85rem; color:var(--text-muted); margin-left:8px">${dateStr}</span>
          </div>
          <div class="actions">
            <button class="btn btn-secondary btn-small edit-prompt-btn" data-id="${p.id}">Edit</button>
            <button class="remove-btn delete-prompt-btn" data-id="${p.id}">&times;</button>
          </div>
        </div>
        <div style="margin-top:8px; font-weight:600;">${p.summary}</div>
        
        <div class="expandable-details" id="details-${p.id}">
          <div style="margin-bottom:8px"><strong>Prompt:</strong><br><span style="white-space:pre-wrap; font-size:0.9rem">${p.prompt}</span></div>
          <div><strong>What I changed next:</strong><br><span style="white-space:pre-wrap; font-size:0.9rem">${p.changed}</span></div>
        </div>
        <button class="toggle-details-btn" data-id="${p.id}">Show / Hide Details</button>
      `;
      listEl.appendChild(card);
    });

    // Binds
    listEl.querySelectorAll(".toggle-details-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        document.getElementById(`details-${id}`).classList.toggle("open");
      });
    });

    listEl.querySelectorAll(".edit-prompt-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        openPromptModal(e.target.getAttribute("data-id")),
      );
    });

    listEl.querySelectorAll(".delete-prompt-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (confirm("Delete this prompt?")) {
          const id = e.target.getAttribute("data-id");
          saveData(
            KEYS.PROMPTS,
            loadData(KEYS.PROMPTS, []).filter((p) => p.id !== id),
          );
          render();
        }
      });
    });
  };

  document
    .getElementById("btn-add-prompt")
    .addEventListener("click", () => openPromptModal());
  window._renderPrompts = render;
  render();
};

const openPromptModal = (id = null) => {
  const prompts = loadData(KEYS.PROMPTS, []);
  const p = id
    ? prompts.find((x) => x.id === id)
    : { prompt: "", model: "ChatGPT", summary: "", changed: "" };

  const html = `
    <div class="form-group">
      <label>Model Used *</label>
      <select id="m-pr-model">
        ${["ChatGPT", "Claude", "Gemini", "AntiGravity", "Other"].map((m) => `<option value="${m}" ${p.model === m ? "selected" : ""}>${m}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label>Prompt *</label>
      <textarea id="m-pr-prompt" required rows="4">${p.prompt || ""}</textarea>
    </div>
    <div class="form-group">
      <label>Output Summary *</label>
      <textarea id="m-pr-summary" required rows="2">${p.summary || ""}</textarea>
    </div>
    <div class="form-group">
      <label>What I changed next</label>
      <textarea id="m-pr-changed" rows="2">${p.changed || ""}</textarea>
    </div>
  `;

  openModal(id ? "Edit Prompt" : "Add Prompt", html, () => {
    const promptTxt = document.getElementById("m-pr-prompt").value.trim();
    if (!promptTxt) return alert("Prompt is required");

    const newPr = {
      id: id || generateId(),
      prompt: promptTxt,
      model: document.getElementById("m-pr-model").value,
      summary: document.getElementById("m-pr-summary").value.trim(),
      changed: document.getElementById("m-pr-changed").value.trim(),
      createdAt: p.createdAt || Date.now(),
    };

    if (id) {
      const idx = prompts.findIndex((x) => x.id === id);
      prompts[idx] = newPr;
    } else {
      prompts.push(newPr);
    }
    saveData(KEYS.PROMPTS, prompts);
    window._renderPrompts();
    closeModal();
  });
};

// --- Experiments ---
const initExperiments = () => {
  const listEl = document.getElementById("experiment-list");
  const filterEl = document.getElementById("filter-experiment-status");

  const render = () => {
    let exps = loadData(KEYS.EXPERIMENTS, []);
    const filter = filterEl.value;
    if (filter !== "all") {
      exps = exps.filter((e) => e.status === filter);
    }
    exps.sort((a, b) => b.createdAt - a.createdAt);

    listEl.innerHTML = "";
    exps.forEach((e) => {
      const card = document.createElement("div");
      card.className = "card search-item";
      card.setAttribute(
        "data-searchable",
        `${e.tried} ${e.outcome} ${e.tags}`.toLowerCase(),
      );

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px">
          <span class="status-pill" style="background-color: ${getStatusColor(e.status)}; color: var(--text-on-pastel)">${e.status}</span>
          <div class="actions">
            <button class="btn btn-secondary btn-small edit-exp-btn" data-id="${e.id}">Edit</button>
            <button class="remove-btn delete-exp-btn" data-id="${e.id}">&times;</button>
          </div>
        </div>
        <div style="font-weight:600; margin-bottom:4px">${e.tried}</div>
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px">${e.outcome}</div>
        ${e.link ? `<div style="font-size:0.85rem"><a href="${e.link}" target="_blank">View Artifact ↗</a></div>` : ""}
        ${e.nextStep ? `<div style="font-size:0.85rem; margin-top:8px"><strong>Next:</strong> ${e.nextStep}</div>` : ""}
        <div style="margin-top:8px">${renderTags(e.tags)}</div>
      `;
      listEl.appendChild(card);
    });

    listEl.querySelectorAll(".edit-exp-btn").forEach((btn) => {
      btn.addEventListener("click", (ev) =>
        openExperimentModal(ev.target.getAttribute("data-id")),
      );
    });

    listEl.querySelectorAll(".delete-exp-btn").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        if (confirm("Delete this experiment?")) {
          const id = ev.target.getAttribute("data-id");
          saveData(
            KEYS.EXPERIMENTS,
            loadData(KEYS.EXPERIMENTS, []).filter((x) => x.id !== id),
          );
          render();
        }
      });
    });
  };

  filterEl.addEventListener("change", render);
  document
    .getElementById("btn-add-experiment")
    .addEventListener("click", () => openExperimentModal());
  window._renderExperiments = render;
  render();
};

const openExperimentModal = (id = null) => {
  const exps = loadData(KEYS.EXPERIMENTS, []);
  const e = id
    ? exps.find((x) => x.id === id)
    : {
        tried: "",
        link: "",
        outcome: "",
        nextStep: "",
        tags: "",
        status: "Planned",
      };

  const html = `
    <div class="form-group">
      <label>What I tried *</label>
      <input type="text" id="m-ex-tried" value="${e.tried || ""}" required>
    </div>
    <div class="form-group">
      <label>Artifact Link / Screenshot notes</label>
      <input type="text" id="m-ex-link" value="${e.link || ""}">
    </div>
    <div class="form-group">
      <label>Outcome</label>
      <textarea id="m-ex-outcome" rows="2">${e.outcome || ""}</textarea>
    </div>
    <div class="form-group">
      <label>Next Step</label>
      <input type="text" id="m-ex-next" value="${e.nextStep || ""}">
    </div>
    <div class="form-row">
      <div class="form-group half">
        <label>Tags (comma-separated)</label>
        <input type="text" id="m-ex-tags" value="${e.tags || ""}">
      </div>
      <div class="form-group half">
        <label>Status</label>
        <select id="m-ex-status">
          <option value="Planned" ${e.status === "Planned" ? "selected" : ""}>Planned</option>
          <option value="Running" ${e.status === "Running" ? "selected" : ""}>Running</option>
          <option value="Done" ${e.status === "Done" ? "selected" : ""}>Done</option>
        </select>
      </div>
    </div>
  `;

  openModal(id ? "Edit Experiment" : "Add Experiment", html, () => {
    const tried = document.getElementById("m-ex-tried").value.trim();
    if (!tried) return alert("What I tried is required");

    const newEx = {
      id: id || generateId(),
      tried,
      link: document.getElementById("m-ex-link").value,
      outcome: document.getElementById("m-ex-outcome").value,
      nextStep: document.getElementById("m-ex-next").value,
      tags: document.getElementById("m-ex-tags").value,
      status: document.getElementById("m-ex-status").value,
      createdAt: e.createdAt || Date.now(),
    };

    if (id) {
      const idx = exps.findIndex((x) => x.id === id);
      exps[idx] = newEx;
    } else {
      exps.push(newEx);
    }
    saveData(KEYS.EXPERIMENTS, exps);
    window._renderExperiments();
    closeModal();
  });
};

// --- Links ---
const initLinks = () => {
  const container = document.getElementById("links-container");

  // Provide defaults if unset
  let links = loadData(KEYS.LINKS, null);
  if (!links) {
    links = [
      {
        id: generateId(),
        label: "Milanote board",
        url: "https://milanote.com",
      },
      { id: generateId(), label: "GitHub repo", url: "https://github.com" },
      {
        id: generateId(),
        label: "AntiGravity",
        url: "https://gemini.google.com",
      },
      { id: generateId(), label: "Claude", url: "https://claude.ai" },
      { id: generateId(), label: "Gemini", url: "https://gemini.google.com" },
      { id: generateId(), label: "ChatGPT", url: "https://chat.openai.com" },
    ];
    saveData(KEYS.LINKS, links);
  }

  const render = () => {
    links = loadData(KEYS.LINKS, []);
    container.innerHTML = "";
    links.forEach((l) => {
      const li = document.createElement("li");
      li.style.position = "relative";
      li.innerHTML = `
        <a href="${l.url}" target="_blank">${l.label}</a>
        <button class="remove-btn remove-link-btn" data-id="${l.id}" style="position:absolute; top:4px; right:8px; display:none;">&times;</button>
      `;
      // Show remove btn on hover
      li.addEventListener(
        "mouseenter",
        () => (li.querySelector(".remove-link-btn").style.display = "block"),
      );
      li.addEventListener(
        "mouseleave",
        () => (li.querySelector(".remove-link-btn").style.display = "none"),
      );
      container.appendChild(li);
    });

    container.querySelectorAll(".remove-link-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        saveData(
          KEYS.LINKS,
          loadData(KEYS.LINKS, []).filter((x) => x.id !== id),
        );
        render();
      });
    });
  };

  document.getElementById("add-link-btn").addEventListener("click", () => {
    const label = prompt("Link Label:");
    if (!label) return;
    const url = prompt("Link URL (include https://):");
    if (!url) return;
    const current = loadData(KEYS.LINKS, []);
    current.push({ id: generateId(), label, url });
    saveData(KEYS.LINKS, current);
    render();
  });

  window._renderLinks = render;
  render();
};

// --- Global Search ---
const initGlobalSearch = () => {
  const searchInput = document.getElementById("global-search-input");

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();

    document.querySelectorAll(".search-item").forEach((item) => {
      if (!term) {
        item.style.display = "";
        return;
      }
      const text = item.getAttribute("data-searchable") || "";
      if (text.includes(term)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });

    // Handle empty states (optional UX enhancement left out for simplicity)
  });
};

// --- Modals Base ---
let modalSaveCallback = null;
const initModals = () => {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");
  const saveBtn = document.getElementById("modal-save");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  saveBtn.addEventListener("click", () => {
    if (modalSaveCallback) modalSaveCallback();
  });
};

const openModal = (title, innerHtml, saver) => {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-body").innerHTML = innerHtml;
  document.getElementById("modal-overlay").classList.remove("hidden");
  modalSaveCallback = saver;
};

const closeModal = () => {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-body").innerHTML = "";
  modalSaveCallback = null;
};

// --- Seed Data Demo ---
const seedDemoData = () => {
  if (loadData(KEYS.SEEDED, false)) {
    if (!confirm("Demo data has already been seeded. Force injection again?"))
      return;
  }

  // Readings
  const readings = [
    {
      id: generateId(),
      title: "Systems of Graphic Design",
      author: "Josef Müller-Brockmann",
      status: "Completed",
      tags: "system design, typography",
      notes: "Core thoughts on grid systems driving organization.",
      createdAt: Date.now() - 100000,
    },
    {
      id: generateId(),
      title: "The New Typography",
      author: "Jan Tschichold",
      status: "In progress",
      tags: "authorship, history",
      notes: "",
      createdAt: Date.now() - 50000,
    },
  ];
  saveData(KEYS.READINGS, readings);

  // Prompts
  const prompts = [
    {
      id: generateId(),
      prompt:
        "Analyze how generative AI transforms designer authorship using parameters instead of pixels.",
      model: "Claude",
      summary: "Outlined a parameter-centric definition of authorship.",
      changed:
        "Adjusted my working definition to focus less on manual creation and more on systemic orchestration.",
      createdAt: Date.now(),
    },
  ];
  saveData(KEYS.PROMPTS, prompts);

  // Experiments
  const exps = [
    {
      id: generateId(),
      tried: "Generated modular scale tokens via LLM and applied to CSS.",
      outcome: "Achieved quick harmonious rhythm but lost manual intuition.",
      nextStep: "Try blending manual selection with generated boundaries.",
      tags: "api, styling",
      status: "Done",
      createdAt: Date.now(),
    },
  ];
  saveData(KEYS.EXPERIMENTS, exps);

  // Weekly Plan
  let plan = loadData(KEYS.WEEKLY_PLAN, {});
  plan[5] = {
    notes: "Research week",
    milestones: [
      { text: "Finish Grid Systems book", done: true },
      { text: "Initialize Command Center repo", done: true },
    ],
  };
  plan[6] = {
    notes: "Synthesis",
    milestones: [
      { text: "Define primary research questions", done: false },
      { text: "First synthesis diagram", done: false },
    ],
  };
  saveData(KEYS.WEEKLY_PLAN, plan);

  saveData(KEYS.SEEDED, true);

  // Re-render
  window._renderReadings();
  window._renderPrompts();
  window._renderExperiments();
  window._renderWeeklyPlan();

  alert("Demo data seeded successfully!");
};
