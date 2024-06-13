import redisClient from '../config/redis';
import positions from '../models/positions';
import employees from '../models/employees';

/**
 * Retrieves employee hierarchy based on position ID.
 * Caches the result using Redis.
 * 
 * @param {number} position_id - The ID of the position
 * @returns {Promise<Array>} - An array representing the hierarchy of employees
 */
export const getEmployeeHierarchyByPosition = async (position_id) => {
  // Check if hierarchy data is cached in Redis
  const cachedData = await redisClient.get(`position:${position_id}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Fetch employee information based on position ID
  const employeesInfo = await employees.findAll({
    attributes: ['id', 'name'],
    include: {
      attributes: ['id', 'name'],
      model: positions,
      as: 'position_info',
    },
    where: {
      position_id,
      is_deleted: false,
    },
  });

  // Recursively fetch hierarchy data for each employee
  const hierarchyData = await Promise.all(
    employeesInfo.map(async (employee) => {
      return await getEmployeeHierarchyByManager(employee.id);
    })
  );

  // Cache the hierarchy data in Redis
  await redisClient.set(`position:${position_id}`, JSON.stringify(hierarchyData));

  return hierarchyData.filter((hierarchy) => hierarchy.length);
};

/**
 * Retrieves employee hierarchy based on manager ID.
 * Caches the result using Redis.
 * 
 * @param {number} manager_id - The ID of the manager
 * @returns {Promise<Array>} - An array representing the hierarchy of employees
 */
const getEmployeeHierarchyByManager = async (manager_id) => {
  // Check if hierarchy data is cached in Redis
  const cachedData = await redisClient.get(`manager:${manager_id}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Fetch employee information based on manager ID
  const employeesInfo = await employees.findAll({
    attributes: ['id', 'name'],
    include: {
      attributes: ['id', 'name'],
      model: positions,
      as: 'position_info',
    },
    where: { manager_id, is_deleted: false },
  });

  // Recursively fetch hierarchy data for each employee
  const hierarchyData = await Promise.all(
    employeesInfo.map(async (employee) => {
      const children = await getEmployeeHierarchyByManager(employee.id);
      return {
        id: employee.id,
        name: employee.name,
        positionId: employee.position_info.id,
        positionName: employee.position_info.name,
        child: children.length ? children : null,
      };
    })
  );

  // Cache the hierarchy data in Redis
  await redisClient.set(`manager:${manager_id}`, JSON.stringify(hierarchyData));

  return hierarchyData;
};
