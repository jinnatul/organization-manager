import { DataTypes, literal } from 'sequelize';
import sequelize from '../config/database';
import positions from './positions';

const { STRING, INTEGER, BOOLEAN } = DataTypes;

// Define the 'employees' model
const employees = sequelize.define(
  'employees',
  {
    name: {
      type: STRING,
      allowNull: false, // Employee name must be provided
    },
    position_id: {
      type: INTEGER,
      allowNull: false, // Position ID must be provided
      references: {
        model: 'positions', // Foreign key reference to 'positions' table
        key: 'id',
      },
    },
    manager_id: {
      type: INTEGER,
      allowNull: true, // Manager ID is optional
      references: {
        model: 'employees', // Self-referencing foreign key to 'employees' table
        key: 'id',
      },
    },
    is_deleted: {
      type: BOOLEAN,
      allowNull: false, // Soft delete flag must be provided
      defaultValue: false, // Default value for soft delete flag is 'false'
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false, // Creation timestamp must be provided
      defaultValue: literal('CURRENT_TIMESTAMP'), // Default value is the current timestamp
    },
    updated_at: {
      type: 'TIMESTAMP',
      allowNull: false, // Update timestamp must be provided
      defaultValue: literal('CURRENT_TIMESTAMP'), // Default value is the current timestamp
    },
  },
  {
    timestamps: true, // Enable automatic timestamp fields
    schema: process.env.SCHEMA, // Use the schema defined in the environment variable
    createdAt: 'created_at', // Map the 'createdAt' field to 'created_at' column
    updatedAt: 'updated_at', // Map the 'updatedAt' field to 'updated_at' column
  }
);

// Define relationships between models
employees.belongsTo(positions, { as: 'position_info', foreignKey: 'position_id' });
// Employee belongs to a position (foreign key: 'position_id')

employees.belongsTo(employees, { as: 'manager_info', foreignKey: 'manager_id' });
// Employee may have a manager who is also an employee (foreign key: 'manager_id')

// Export the 'employees' model
export default employees;
