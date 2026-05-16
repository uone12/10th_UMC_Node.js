const storeService = require("../services/store.service");

// 1-1
exports.createStore = async (req, res, next) => {
  try {
    const { regionId } = req.params;
    const result = await storeService.createStore(regionId, req.body);

    res.status(201).json({
      success: true,
      message: "가게 추가 성공",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 1-2
exports.createReview = async (req, res, next) => {
  try {
    const { storeId } = req.params;

    // 특정 사용자라고 가정
    const memberId = 1;

    const result = await storeService.createReview(memberId, storeId, req.body);

    res.status(201).json({
      success: true,
      message: "리뷰 추가 성공",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 1-3
exports.createMission = async (req, res, next) => {
  try {
    const { storeId } = req.params;

    const result = await storeService.createMission(storeId, req.body);

    res.status(201).json({
      success: true,
      message: "미션 추가 성공",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 1-4
exports.challengeMission = async (req, res, next) => {
  try {
    const { missionId } = req.params;

    // 특정 사용자라고 가정
    const memberId = 1;

    const result = await storeService.challengeMission(memberId, missionId);

    res.status(201).json({
      success: true,
      message: "미션 도전 성공",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
