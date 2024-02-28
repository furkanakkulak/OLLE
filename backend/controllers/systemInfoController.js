const systemInfoService = require('../services/systemInfoService');

const getSystemInfo = async (req, res, next) => {
  const { command } = req.body;

  if (!command) {
    return res
      .status(400)
      .json({ error: 'command key is missing in the request body' });
  }

  try {
    const response = await systemInfoService.getSystemInfo(command);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSystemInfo };
