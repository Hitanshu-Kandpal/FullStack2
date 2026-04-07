import React, { useEffect, useState } from "react";
import { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent } from "./api";

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

  // Design System
  const styles = {
    // Layout
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#e2e8f0',
      width: '100vw',
      overflowX: 'hidden',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 24px',
      width: '100%',
    },

    // Header
    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#f8fafc',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '16px',
      color: '#94a3b8',
      margin: '0',
    },

    // Cards
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #334155',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#f8fafc',
      margin: '0 0 16px 0',
    },

    // Form
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      alignItems: 'end',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#cbd5e1',
      marginBottom: '6px',
    },
    input: {
      padding: '10px 12px',
      border: '1px solid #475569',
      borderRadius: '8px',
      backgroundColor: '#334155',
      color: '#f8fafc',
      fontSize: '14px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
    },

    // Buttons
    button: {
      padding: '10px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    primaryButtonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },
    secondaryButton: {
      backgroundColor: '#64748b',
      color: 'white',
    },
    secondaryButtonHover: {
      backgroundColor: '#475569',
    },
    dangerButton: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
    dangerButtonHover: {
      backgroundColor: '#dc2626',
    },

    // Search
    searchSection: {
      display: 'flex',
      gap: '12px',
      alignItems: 'end',
    },

    // Stats
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    statCard: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #334155',
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#3b82f6',
      margin: '0 0 4px 0',
    },
    statLabel: {
      fontSize: '14px',
      color: '#94a3b8',
      margin: '0',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },

    // Table
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #334155',
    },
    tableHeader: {
      backgroundColor: '#334155',
      padding: '16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#cbd5e1',
      borderBottom: '1px solid #475569',
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid #334155',
      fontSize: '14px',
      color: '#e2e8f0',
    },
    tableRow: {
      transition: 'background-color 0.2s',
    },
    tableRowHover: {
      backgroundColor: '#334155',
    },

    // Actions
    actionButton: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginRight: '8px',
    },
    editButton: {
      backgroundColor: '#f59e0b',
      color: 'white',
    },
    editButtonHover: {
      backgroundColor: '#d97706',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
    deleteButtonHover: {
      backgroundColor: '#dc2626',
    },

    // Messages
    message: {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '24px',
      fontSize: '14px',
      fontWeight: '500',
    },
    successMessage: {
      backgroundColor: '#10b981',
      color: 'white',
    },
    errorMessage: {
      backgroundColor: '#ef4444',
      color: 'white',
    },

    // Loading
    loading: {
      textAlign: 'center',
      padding: '48px',
      color: '#94a3b8',
    },

    // Empty state
    emptyState: {
      textAlign: 'center',
      padding: '64px 24px',
      color: '#94a3b8',
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Student Management</h1>
          <p style={styles.subtitle}>Manage your student records efficiently</p>
        </div>

        {/* Messages */}
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes("success") ? styles.successMessage : styles.errorMessage)
          }}>
            {message}
          </div>
        )}

        {/* Add Student Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            {isEditing ? "Edit Student" : "Add New Student"}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Student ID</label>
              <input
                style={styles.input}
                type="number"
                placeholder="Enter student ID"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={isEditing}
                required
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#475569';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#475569';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Course</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter course"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                required
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#475569';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                type="submit"
                disabled={loading}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryButtonHover)}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                {loading ? "Processing..." : (isEditing ? "Update Student" : "Add Student")}
              </button>
              {isEditing && (
                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  type="button"
                  onClick={handleCancel}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.secondaryButtonHover)}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#64748b'}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Search Student</h2>
          <div style={styles.searchSection}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Student ID</label>
              <input
                style={styles.input}
                type="number"
                placeholder="Enter student ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.borderColor = '#475569';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={fetchStudentByIdHandler}
              disabled={loading}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryButtonHover)}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {singleStudent && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#334155',
              borderRadius: '8px',
              border: '1px solid #475569'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#f8fafc', fontSize: '16px' }}>Search Result</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                <div>
                  <span style={{ fontWeight: '600', color: '#cbd5e1' }}>ID:</span> {singleStudent.id}
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#cbd5e1' }}>Name:</span> {singleStudent.name}
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#cbd5e1' }}>Course:</span> {singleStudent.course}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats and Student List */}
        <div style={styles.card}>
          {/* Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{students.length}</div>
              <div style={styles.statLabel}>Total Students</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>
                {students.filter(s => s.course.toLowerCase().includes('computer')).length}
              </div>
              <div style={styles.statLabel}>CS Students</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>
                {new Set(students.map(s => s.course)).size}
              </div>
              <div style={styles.statLabel}>Courses</div>
            </div>
          </div>

          {/* Student List */}
          <h2 style={styles.cardTitle}>All Students</h2>

          {loading && <div style={styles.loading}>Loading students...</div>}

          {!loading && students.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#cbd5e1' }}>No students found</h3>
              <p style={{ margin: '0' }}>Add your first student to get started</p>
            </div>
          )}

          {!loading && students.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Course</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={styles.tableCell}>{student.id}</td>
                      <td style={styles.tableCell}>{student.name}</td>
                      <td style={styles.tableCell}>{student.course}</td>
                      <td style={styles.tableCell}>
                        <button
                          style={{ ...styles.actionButton, ...styles.editButton }}
                          onClick={() => handleEdit(student)}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.editButtonHover)}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
                        >
                          Edit
                        </button>
                        <button
                          style={{ ...styles.actionButton, ...styles.deleteButton }}
                          onClick={() => handleDelete(student.id)}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}