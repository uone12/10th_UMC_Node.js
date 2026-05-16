const db = require("../db");

// 1-1
exports.createStore = async ({ regionId, name, address, score }) => {
  const sql = `
    INSERT INTO store 
    (location_id, name, address, score, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;

  const [result] = await db.query(sql, [regionId, name, address, score]);

  return {
    id: result.insertId,
    regionId,
    name,
    address,
    score,
  };
};

// 1-2 검증용
exports.findStoreById = async (storeId) => {
  const sql = `
    SELECT *
    FROM store
    WHERE id = ?
  `;

  const [rows] = await db.query(sql, [storeId]);

  return rows[0];
};

// 1-2
exports.createReview = async ({ memberId, storeId, body, score }) => {
  const sql = `
    INSERT INTO review
    (member_id, store_id, body, score)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [memberId, storeId, body, score]);

  return {
    id: result.insertId,
    memberId,
    storeId,
    body,
    score,
  };
};

// 1-3
exports.createMission = async ({ storeId, reward, deadline, missionSpec }) => {
  const sql = `
    INSERT INTO mission
    (store_id, reward, deadline, mission_spec, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  const [result] = await db.query(sql, [
    storeId,
    reward,
    deadline,
    missionSpec,
  ]);

  return {
    id: result.insertId,
    storeId,
    reward,
    deadline,
    missionSpec,
  };
};

// 1-4 검증용
exports.findMissionById = async (missionId) => {
  const sql = `
    SELECT *
    FROM mission
    WHERE id = ?
  `;

  const [rows] = await db.query(sql, [missionId]);

  return rows[0];
};

// 1-4 중복 도전 검증용
exports.findMemberMission = async (memberId, missionId) => {
  const sql = `
    SELECT *
    FROM mission_member
    WHERE member_id = ?
      AND mission_id = ?
  `;

  const [rows] = await db.query(sql, [memberId, missionId]);

  return rows[0];
};

// 1-4
exports.createMemberMission = async ({ memberId, missionId, storeId, status }) => {
  const sql = `
    INSERT INTO mission_member
    (member_id, mission_id, store_id, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;

  const [result] = await db.query(sql, [
    memberId,
    missionId,
    storeId,
    status,
  ]);

  return {
    id: result.insertId,
    memberId,
    missionId,
    storeId,
    status,
  };
};
