const express = require('express');
const router = express.Router();
const hospitals = require('../data/hospitals.json');

// GET /api/hospitals
// Supports query params: name, department, city, maxPrice, minRating, hasAppointment
router.get('/', (req, res) => {
  let results = hospitals.slice();

  const { name, department, city, maxPrice, minRating, hasAppointment } = req.query;

  if (name) {
    const q = name.toLowerCase();
    results = results.filter(h => h.name.toLowerCase().includes(q));
  }
  if (department) {
    const dep = department.toLowerCase();
    results = results.filter(h => h.departments.map(d => d.toLowerCase()).includes(dep));
  }
  if (city) {
    const c = city.toLowerCase();
    results = results.filter(h => h.city.toLowerCase() === c);
  }
  if (maxPrice) {
    const max = Number(maxPrice);
    results = results.filter(h => h.avgConsultationPrice <= max);
  }
  if (minRating) {
    const r = Number(minRating);
    results = results.filter(h => h.rating >= r);
  }
  if (hasAppointment !== undefined) {
    const want = hasAppointment === 'true' || hasAppointment === '1';
    results = results.filter(h => h.acceptsAppointments === want);
  }

  res.json({ count: results.length, results });
});

// GET /api/hospitals/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const found = hospitals.find(h => String(h.id) === String(id));
  if (!found) return res.status(404).json({ error: 'Hospital not found' });
  res.json(found);
});

module.exports = router;
