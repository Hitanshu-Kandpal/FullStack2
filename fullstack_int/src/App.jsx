import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  PencilLine,
  Search,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent } from "./api";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", course: "" });
  const [searchId, setSearchId] = useState("");
  const [singleStudent, setSingleStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res);
      setMessage("");
    } catch (err) {
      setMessage("Failed to load students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentByIdHandler = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const res = await getStudentById(searchId);
      setSingleStudent(res);
      setMessage("");
    } catch (err) {
      setMessage("Student not found");
      setSingleStudent(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.course) {
      setMessage("All fields are required");
      return;
    }
    setLoading(true);
    try {
      if (isEditing) {
        await updateStudent(editingId, form);
        setMessage("Student updated successfully");
      } else {
        await addStudent(form);
        setMessage("Student added successfully");
      }
      setForm({ id: "", name: "", course: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setMessage(isEditing ? "Failed to update student" : "Failed to add student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setForm({ id: student.id.toString(), name: student.name, course: student.course });
    setIsEditing(true);
    setEditingId(student.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    setLoading(true);
    try {
      await deleteStudent(id);
      setMessage("Student deleted successfully");
      fetchStudents();
    } catch (err) {
      setMessage("Failed to delete student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ id: "", name: "", course: "" });
    setIsEditing(false);
    setEditingId(null);
    setMessage("");
  };

  const totalStudents = students.length;
  const computerScienceStudents = useMemo(
    () => students.filter((student) => student.course.toLowerCase().includes("computer")).length,
    [students],
  );
  const totalCourses = useMemo(() => new Set(students.map((student) => student.course)).size, [students]);

  const statusTone = message.toLowerCase().includes("failed") || message.toLowerCase().includes("required") || message.toLowerCase().includes("not found")
    ? "status-banner status-banner--error"
    : "status-banner status-banner--success";

  return (
    <div className="student-dashboard-shell">
      <div className="student-dashboard-backdrop student-dashboard-backdrop--left" />
      <div className="student-dashboard-backdrop student-dashboard-backdrop--right" />

      <main className="student-dashboard">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="hero-kicker">Campus operations</span>
            <h1 className="hero-title">Student Management</h1>
            <p className="hero-description">
              Manage records, update details, and keep your student list organized from one clear workspace.
            </p>
          </div>

          <div className="hero-highlight-card">
            <div className="hero-highlight-label">
              <Sparkles size={16} />
              <span>System snapshot</span>
            </div>
            <div className="hero-highlight-value">{totalStudents}</div>
            <p className="hero-highlight-text">Active student records currently available in the system.</p>
          </div>
        </section>

        {message && <div className={statusTone}>{message}</div>}

        <section className="overview-grid" aria-label="Student overview">
          <article className="metric-card">
            <div className="metric-card__icon metric-card__icon--blue">
              <Users size={20} />
            </div>
            <div>
              <p className="metric-card__label">Total Students</p>
              <h2 className="metric-card__value">{totalStudents}</h2>
            </div>
          </article>

          <article className="metric-card">
            <div className="metric-card__icon metric-card__icon--amber">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="metric-card__label">CS Students</p>
              <h2 className="metric-card__value">{computerScienceStudents}</h2>
            </div>
          </article>

          <article className="metric-card">
            <div className="metric-card__icon metric-card__icon--teal">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="metric-card__label">Courses</p>
              <h2 className="metric-card__value">{totalCourses}</h2>
            </div>
          </article>
        </section>

        <section className="workspace-grid">
          <article className="panel-card panel-card--form">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">Record editor</p>
                <h2 className="panel-title">{isEditing ? "Edit Student" : "Add New Student"}</h2>
              </div>
              <div className="panel-chip">
                <UserPlus size={16} />
                <span>{isEditing ? "Update mode" : "New record"}</span>
              </div>
            </div>

            <form className="student-form" onSubmit={handleSubmit}>
              <label className="field-group">
                <span className="field-label">Student ID</span>
                <input
                  className="field-input"
                  type="number"
                  placeholder="Enter student ID"
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value })}
                  disabled={isEditing}
                  required
                />
              </label>

              <label className="field-group">
                <span className="field-label">Full Name</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="field-group">
                <span className="field-label">Course</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Enter course"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  required
                />
              </label>

              <div className="form-actions">
                <button className="primary-action" type="submit" disabled={loading}>
                  {isEditing ? <PencilLine size={16} /> : <UserPlus size={16} />}
                  <span>{loading ? "Processing..." : isEditing ? "Update Student" : "Add Student"}</span>
                </button>

                {isEditing && (
                  <button className="secondary-action" type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </article>

          <article className="panel-card panel-card--search">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">Quick lookup</p>
                <h2 className="panel-title">Search Student</h2>
              </div>
              <div className="panel-chip">
                <Search size={16} />
                <span>ID search</span>
              </div>
            </div>

            <div className="search-layout">
              <label className="field-group field-group--search">
                <span className="field-label">Student ID</span>
                <input
                  className="field-input"
                  type="number"
                  placeholder="Enter student ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </label>

              <button className="primary-action primary-action--search" onClick={fetchStudentByIdHandler} disabled={loading}>
                <Search size={16} />
                <span>{loading ? "Searching..." : "Search"}</span>
              </button>
            </div>

            {singleStudent && (
              <div className="search-result-card">
                <div className="search-result-header">
                  <h3 className="search-result-title">Search Result</h3>
                  <span className="search-result-badge">Student found</span>
                </div>

                <div className="search-result-grid">
                  <div className="search-result-item">
                    <span className="search-result-key">ID</span>
                    <strong className="search-result-value">{singleStudent.id}</strong>
                  </div>
                  <div className="search-result-item">
                    <span className="search-result-key">Name</span>
                    <strong className="search-result-value">{singleStudent.name}</strong>
                  </div>
                  <div className="search-result-item">
                    <span className="search-result-key">Course</span>
                    <strong className="search-result-value">{singleStudent.course}</strong>
                  </div>
                </div>
              </div>
            )}
          </article>
        </section>

        <section className="panel-card roster-panel">
          <div className="panel-heading panel-heading--spaced">
            <div>
              <p className="panel-eyebrow">Student roster</p>
              <h2 className="panel-title">All Students</h2>
            </div>
            <span className="panel-chip panel-chip--neutral">{totalStudents} records</span>
          </div>

          {loading && <div className="loading-state">Loading students...</div>}

          {!loading && students.length === 0 && (
            <div className="empty-roster-state">
              <div className="empty-roster-icon">📭</div>
              <h3 className="empty-roster-title">No students found</h3>
              <p className="empty-roster-copy">Add your first student to get started.</p>
            </div>
          )}

          {!loading && students.length > 0 && (
            <div className="table-scroll-frame">
              <table className="student-roster-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>
                        <div className="student-name-cell">
                          <span className="student-avatar">{student.name.charAt(0).toUpperCase()}</span>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="course-pill">{student.course}</span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button className="table-action table-action--edit" onClick={() => handleEdit(student)}>
                            <PencilLine size={14} />
                            <span>Edit</span>
                          </button>
                          <button className="table-action table-action--delete" onClick={() => handleDelete(student.id)}>
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
