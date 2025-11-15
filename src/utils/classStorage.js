/**
 * Global Class Storage Management System
 *
 * This module provides centralized storage management for the School Management System.
 * It replaces component-level localStorage with a global registry system.
 *
 * FIXES IMPLEMENTED:
 * 1. Accurate learner counts (Issue #1)
 * 2. Class persistence across sessions (Issue #2)
 * 3. Correct class headers (Issue #3)
 * 4. Duplicate learner prevention (Issue #4)
 * 5. Proper name formatting "Surname Name" (Issue #5)
 * 6. Alphabetical sorting by surname (Issue #6)
 */

// Storage keys
const CLASS_REGISTRY_KEY = 'fundisa_class_registry';
const CLASS_PREFIX = 'fundisa_class_';

/**
 * Get all classes with summary information
 * @returns {Array} Array of class objects with id, grade, section, learnerCount, subjectCount
 */
export const getAllClasses = () => {
  try {
    const registry = localStorage.getItem(CLASS_REGISTRY_KEY);
    const classIds = registry ? JSON.parse(registry) : [];

    return classIds.map(id => {
      const classData = getClassById(id);
      return {
        id: classData.id,
        grade: classData.grade,
        section: classData.section,
        learnerCount: classData.learners?.length || 0,
        subjectCount: classData.subjects?.length || 0,
        createdAt: classData.createdAt,
        updatedAt: classData.updatedAt
      };
    });
  } catch (error) {
    console.error('Error getting all classes:', error);
    return [];
  }
};

/**
 * Get full class data by ID
 * @param {string} classId - Class ID
 * @returns {Object|null} Full class data or null if not found
 */
export const getClassById = (classId) => {
  try {
    const key = `${CLASS_PREFIX}${classId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting class by ID:', error);
    return null;
  }
};

/**
 * Create a new class
 * @param {string} grade - Grade level (7-12)
 * @param {string} section - Optional section (A, B, C, etc.)
 * @returns {Object} Created class object
 */
export const createClass = (grade, section = '') => {
  try {
    const classId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newClass = {
      id: classId,
      grade: grade.toString(),
      section: section.trim(),
      learners: [],
      subjects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveClass(newClass);

    // Update registry
    const registry = localStorage.getItem(CLASS_REGISTRY_KEY);
    const classIds = registry ? JSON.parse(registry) : [];
    classIds.push(classId);
    localStorage.setItem(CLASS_REGISTRY_KEY, JSON.stringify(classIds));

    return newClass;
  } catch (error) {
    console.error('Error creating class:', error);
    return null;
  }
};

/**
 * Save or update class data
 * @param {Object} classData - Class data object
 */
export const saveClass = (classData) => {
  try {
    const key = `${CLASS_PREFIX}${classData.id}`;
    classData.updatedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(classData));
  } catch (error) {
    console.error('Error saving class:', error);
  }
};

/**
 * Delete a class
 * @param {string} classId - Class ID to delete
 */
export const deleteClass = (classId) => {
  try {
    // Remove class data
    const key = `${CLASS_PREFIX}${classId}`;
    localStorage.removeItem(key);

    // Remove from registry
    const registry = localStorage.getItem(CLASS_REGISTRY_KEY);
    if (registry) {
      const classIds = JSON.parse(registry);
      const updated = classIds.filter(id => id !== classId);
      localStorage.setItem(CLASS_REGISTRY_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Error deleting class:', error);
  }
};

/**
 * Add learner to class with duplicate validation (FIXES ISSUE #4)
 * @param {string} classId - Class ID
 * @param {Object} learner - Learner object { surname, name, progressed }
 * @returns {Object} { error: boolean, message: string }
 */
export const addLearnerToClass = (classId, learner) => {
  try {
    // Validate learner doesn't exist in ANY class
    const allClasses = getAllClasses();
    for (const cls of allClasses) {
      const fullClass = getClassById(cls.id);
      const exists = fullClass.learners.some(l =>
        l.surname.toLowerCase() === learner.surname.toLowerCase() &&
        l.name.toLowerCase() === learner.name.toLowerCase()
      );

      if (exists) {
        return {
          error: true,
          message: `${learner.surname} ${learner.name} already belongs to Grade ${fullClass.grade}${fullClass.section ? ` ${fullClass.section}` : ''}`
        };
      }
    }

    // Add learner
    const classData = getClassById(classId);
    if (!classData) {
      return { error: true, message: 'Class not found' };
    }

    const learnerId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newLearner = {
      id: learnerId,
      surname: learner.surname,
      name: learner.name,
      progressed: learner.progressed || false
    };

    classData.learners.push(newLearner);
    saveClass(classData);

    return { error: false, message: 'Learner added successfully', learnerId };
  } catch (error) {
    console.error('Error adding learner:', error);
    return { error: true, message: 'Failed to add learner' };
  }
};

/**
 * Remove learner from class (also removes from all subject enrollments)
 * @param {string} classId - Class ID
 * @param {string} learnerId - Learner ID
 * @returns {Object} { error: boolean, message: string }
 */
export const removeLearnerFromClass = (classId, learnerId) => {
  try {
    const classData = getClassById(classId);
    if (!classData) {
      return { error: true, message: 'Class not found' };
    }

    // Remove learner
    classData.learners = classData.learners.filter(l => l.id !== learnerId);

    // Remove from all subject enrollments
    classData.subjects = classData.subjects.map(subject => ({
      ...subject,
      enrolledLearnerIds: subject.enrolledLearnerIds.filter(id => id !== learnerId)
    }));

    saveClass(classData);
    return { error: false, message: 'Learner removed successfully' };
  } catch (error) {
    console.error('Error removing learner:', error);
    return { error: true, message: 'Failed to remove learner' };
  }
};

/**
 * Update learner details
 * @param {string} classId - Class ID
 * @param {string} learnerId - Learner ID
 * @param {Object} updates - Updated learner data
 * @returns {Object} { error: boolean, message: string }
 */
export const updateLearner = (classId, learnerId, updates) => {
  try {
    const classData = getClassById(classId);
    if (!classData) {
      return { error: true, message: 'Class not found' };
    }

    classData.learners = classData.learners.map(l =>
      l.id === learnerId ? { ...l, ...updates } : l
    );

    saveClass(classData);
    return { error: false, message: 'Learner updated successfully' };
  } catch (error) {
    console.error('Error updating learner:', error);
    return { error: true, message: 'Failed to update learner' };
  }
};

/**
 * Add subject to class with duplicate validation
 * @param {string} classId - Class ID
 * @param {Object} subject - Subject object { phase, grade, subjectKey, name }
 * @returns {Object} { error: boolean, message: string }
 */
export const addSubjectToClass = (classId, subject) => {
  try {
    const classData = getClassById(classId);
    if (!classData) {
      return { error: true, message: 'Class not found' };
    }

    // Check if subject already exists
    const exists = classData.subjects.some(s =>
      s.phase === subject.phase &&
      s.grade === subject.grade &&
      s.subjectKey === subject.subjectKey
    );

    if (exists) {
      return { error: true, message: 'This subject has already been added to this class' };
    }

    const subjectId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSubject = {
      id: subjectId,
      phase: subject.phase,
      grade: subject.grade,
      subjectKey: subject.subjectKey,
      name: subject.name,
      enrolledLearnerIds: classData.learners.map(l => l.id) // Enroll all learners by default
    };

    classData.subjects.push(newSubject);
    saveClass(classData);

    return { error: false, message: 'Subject added successfully', subjectId };
  } catch (error) {
    console.error('Error adding subject:', error);
    return { error: true, message: 'Failed to add subject' };
  }
};

/**
 * Format learner name as "Surname Name" (FIXES ISSUE #5)
 * @param {Object} learner - Learner object
 * @returns {string} Formatted name
 */
export const formatLearnerName = (learner) => {
  return `${learner.surname} ${learner.name}`;
};

/**
 * Sort learners alphabetically by surname (FIXES ISSUE #6)
 * @param {Array} learners - Array of learner objects
 * @returns {Array} Sorted array
 */
export const sortLearnersBySurname = (learners) => {
  return [...learners].sort((a, b) => a.surname.localeCompare(b.surname));
};

/**
 * Initialize demo data if no classes exist
 */
export const initializeDemoData = () => {
  const existing = getAllClasses();
  if (existing.length === 0) {
    // Create demo class
    const demoClass = createClass('12', 'B');
    console.log('Demo class created:', demoClass.id);
  }
};

// Export all functions
export default {
  getAllClasses,
  getClassById,
  createClass,
  saveClass,
  deleteClass,
  addLearnerToClass,
  removeLearnerFromClass,
  updateLearner,
  addSubjectToClass,
  formatLearnerName,
  sortLearnersBySurname,
  initializeDemoData
};
