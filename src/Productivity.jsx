
import React, { useState, useEffect, useRef } from 'react';

// ---------- Helpers ----------
const useLocalState = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {}
  }, [key, state]);
  return [state, setState];
};

// ---------- Notes Tool ----------
function NotesTool() {
  const [notes, setNotes] = useLocalState('ps_notes', []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = () => {
    if (!title.trim() && !body.trim()) return;
    const newNote = { id: Date.now(), title: title.trim() || 'Untitled', body: body.trim(), created: new Date().toISOString() };
    setNotes([newNote, ...notes]);
    setTitle('');
    setBody('');
  };
  const removeNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Notes</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
      <textarea value={body} onChange={e=>setBody(e.target.value)} rows={3} placeholder="Write something..." className="w-full mb-2 p-2 border rounded" />
      <div className="flex gap-2 justify-end">
        <button onClick={()=>{setTitle(''); setBody('');}} className="px-3 py-1 rounded bg-gray-100">Clear</button>
        <button onClick={addNote} className="px-3 py-1 rounded bg-amber-500 text-white">Add Note</button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {notes.length === 0 && <div className="text-sm text-gray-500">No notes yet.</div>}
        {notes.map(note => (
          <div key={note.id} className="border p-3 rounded bg-gray-50">
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="font-medium">{note.title}</div>
                <div className="text-xs text-gray-500">{new Date(note.created).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>removeNote(note.id)} className="text-sm text-red-500">Delete</button>
              </div>
            </div>
            <div className="mt-2 text-sm whitespace-pre-wrap">{note.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Weekly Planner Tool ----------
const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function WeeklyPlanner() {
  const [planner, setPlanner] = useLocalState('ps_planner', () => {
    // initialize seven days
    const base = {};
    for (let i=0;i<7;i++) base[i] = [];
    return base;
  });
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (!taskText.trim()) return;
    const tasks = planner[selectedDay] || [];
    const newTask = { id: Date.now(), text: taskText.trim(), done: false };
    setPlanner({...planner, [selectedDay]: [newTask, ...tasks]});
    setTaskText('');
  };
  const toggleDone = (day, id) => {
    const changed = (planner[day] || []).map(t => t.id===id ? {...t, done: !t.done}: t);
    setPlanner({...planner, [day]: changed});
  };
  const removeTask = (day, id) => {
    const changed = (planner[day] || []).filter(t => t.id!==id);
    setPlanner({...planner, [day]: changed});
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Weekly Planner</h3>
      <div className="flex gap-2 overflow-auto mb-3">
        {weekdayNames.map((d,i) => (
          <button key={d} onClick={()=>setSelectedDay(i)} className={`px-3 py-1 rounded ${selectedDay===i ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}>{d.slice(0,3)}</button>
        ))}
      </div>
      <div className="mb-2">
        <input placeholder="Add task for selected day" value={taskText} onChange={e=>setTaskText(e.target.value)} className="w-full p-2 border rounded" />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={()=>setTaskText('')} className="px-3 py-1 rounded bg-gray-100">Clear</button>
          <button onClick={addTask} className="px-3 py-1 rounded bg-amber-500 text-white">Add</button>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-sm font-medium mb-1">Tasks for {weekdayNames[selectedDay]}</div>
        <div className="flex flex-col gap-2">
          {(planner[selectedDay] || []).length === 0 && <div className="text-sm text-gray-500">No tasks for this day.</div>}
          {(planner[selectedDay] || []).map(t => (
            <div key={t.id} className="flex items-center justify-between gap-2 p-2 border rounded">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={t.done} onChange={()=>toggleDone(selectedDay, t.id)} />
                <div className={`${t.done ? 'line-through text-gray-400' : ''}`}>{t.text}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>removeTask(selectedDay, t.id)} className="text-sm text-red-500">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Pomodoro Timer Tool ----------
function Pomodoro() {
  const [workMinutes, setWorkMinutes] = useLocalState('ps_pom_work', 25);
  const [breakMinutes, setBreakMinutes] = useLocalState('ps_pom_break', 5);
  const [isRunning, setIsRunning] = useLocalState('ps_pom_running', false);
  const [isWork, setIsWork] = useLocalState('ps_pom_isWork', true);
  const [secondsLeft, setSecondsLeft] = useLocalState('ps_pom_seconds', workMinutes*60);
  const intervalRef = useRef(null);

  useEffect(()=>{
    // sync secondsLeft when durations change and not running
    if (!isRunning) setSecondsLeft((isWork ? workMinutes : breakMinutes) * 60);
  }, [workMinutes, breakMinutes, isWork]);

  useEffect(()=>{
    if (isRunning) {
      intervalRef.current = setInterval(()=>{
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // switch
            setIsWork(w => !w);
            return (isWork ? breakMinutes : workMinutes)*60; // flip
          }
          return prev - 1;
        });
      }, 1000);
      return ()=> clearInterval(intervalRef.current);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning, isWork, workMinutes, breakMinutes]);

  const startPause = ()=> setIsRunning(r => !r);
  const reset = ()=>{
    setIsRunning(false);
    setIsWork(true);
    setSecondsLeft(workMinutes*60);
  };

  const mm = String(Math.floor(secondsLeft/60)).padStart(2,'0');
  const ss = String(secondsLeft%60).padStart(2,'0');

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Pomodoro</h3>
      <div className="flex items-center gap-4">
        <div className="text-3xl font-mono">{mm}:{ss}</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button onClick={startPause} className="px-3 py-1 rounded bg-amber-500 text-white">{isRunning ? 'Pause' : 'Start'}</button>
            <button onClick={reset} className="px-3 py-1 rounded bg-gray-100">Reset</button>
          </div>
          <div className="text-sm text-gray-600">Mode: {isWork ? 'Work' : 'Break'}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs">Work (minutes)</label>
          <input type="number" min={1} value={workMinutes} onChange={e=>setWorkMinutes(Number(e.target.value)||1)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-xs">Break (minutes)</label>
          <input type="number" min={1} value={breakMinutes} onChange={e=>setBreakMinutes(Number(e.target.value)||1)} className="w-full p-2 border rounded" />
        </div>
      </div>
    </div>
  );
}

// ---------- Habit Tracker Tool ----------
function HabitTracker() {
  const [habits, setHabits] = useLocalState('ps_habits', []);
  const [newHabit, setNewHabit] = useState('');
  const todayIndex = (() => { const d = new Date(); return d.getDay(); })();

  const addHabit = ()=>{
    if (!newHabit.trim()) return;
    const h = { id: Date.now(), name: newHabit.trim(), days: {} }; // days keyed by ISO date
    setHabits([h, ...habits]);
    setNewHabit('');
  };
  const toggleHabitDay = (habitId, dateStr) => {
    setHabits(habits.map(h => {
      if (h.id !== habitId) return h;
      const days = {...h.days};
      if (days[dateStr]) delete days[dateStr]; else days[dateStr] = true;
      return {...h, days};
    }));
  };
  const removeHabit = id => setHabits(habits.filter(h=>h.id!==id));

  const weekDates = (()=>{
    const base = new Date();
    const start = new Date(base);
    // start on Sunday
    const diff = base.getDay();
    start.setDate(base.getDate() - diff);
    const arr = [];
    for (let i=0;i<7;i++){
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(d);
    }
    return arr;
  })();

  const iso = d => d.toISOString().slice(0,10);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Habit Tracker</h3>
      <div className="flex gap-2 mb-3">
        <input value={newHabit} onChange={e=>setNewHabit(e.target.value)} placeholder="New habit (e.g. Read)" className="flex-1 p-2 border rounded" />
        <button onClick={addHabit} className="px-3 py-1 rounded bg-amber-500 text-white">Add</button>
      </div>

      <div className="overflow-auto">
        <div className="flex gap-2 text-xs mb-2">
          {weekDates.map((d,i)=> (
            <div key={i} className={`w-12 text-center ${i===todayIndex ? 'font-semibold' : 'text-gray-600'}`}>{d.toLocaleDateString(undefined,{weekday:'short', day:'numeric'})}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {habits.length === 0 && <div className="text-sm text-gray-500">No habits yet.</div>}
          {habits.map(h => (
            <div key={h.id} className="p-2 border rounded flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="font-medium">{h.name}</div>
                <div className="text-xs text-gray-500">Streak: {Object.keys(h.days).length}</div>
              </div>
              <div className="flex items-center gap-1">
                {weekDates.map(d => (
                  <button key={iso(d)} onClick={()=>toggleHabitDay(h.id, iso(d))} className={`w-10 h-8 rounded ${h.days[iso(d)] ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}>{d.getDate()}</button>
                ))}
                <button onClick={()=>removeHabit(h.id)} className="ml-2 text-red-500">Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Main Suite Component ----------
export default function ProductivitySuite(){
  const [tab, setTab] = useState('planner');

  const tabs = [
    { id: 'planner', label: 'Planner' },
    { id: 'notes', label: 'Notes' },
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'habits', label: 'Habits' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Weekly Productivity Suite</h1>
          <div className="text-sm text-gray-600">All data stored locally in your browser</div>
        </header>

        <div className="mb-4 flex gap-2">
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-2 rounded-2xl ${tab===t.id ? 'bg-amber-500 text-white' : 'bg-white shadow-sm'}`}>{t.label}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tab === 'planner' && <WeeklyPlanner />}
          {tab === 'notes' && <NotesTool />}
          {tab === 'pomodoro' && <Pomodoro />}
          {tab === 'habits' && <HabitTracker />}
        </div>

        <footer className="mt-6 text-xs text-gray-500">Tip: Use the Planner for daily scheduling, Pomodoro to focus, Notes for capture, and Habits to build consistency.</footer>
      </div>
    </div>
  );
};
