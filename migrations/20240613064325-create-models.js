/**
 * Migration script to create 'positions' and 'employees' tables in the database.
 * - 'positions' table stores information about different job positions.
 * - 'employees' table stores information about employees, including their position and manager.
 *
 * @module Migration
 * @requires sequelize
 * @requires ../src/config/database
 * @exports up - Function to apply the migration.
 * @exports down - Function to revert the migration.
 */

import { DataTypes, literal } from 'sequelize';
import '../src/config/migrationdb';

const { STRING, INTEGER, BOOLEAN } = DataTypes;

/**
 * Applies the migration: creates 'positions' and 'employees' tables.
 *
 * @param {object} queryInterface - The Sequelize queryInterface object.
 * @returns {Promise<void>} Promise representing the completion of table creation.
 */
export const up = async (queryInterface) => {
  // Create 'positions' table
  await queryInterface.createTable(
    'positions',
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      is_deleted: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      schema: process.env.SCHEMA,
    }
  );

  // Create 'employees' table
  await queryInterface.createTable(
    'employees',
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      position_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'positions',
          key: 'id',
        },
      },
      manager_id: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      is_deleted: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      schema: process.env.SCHEMA,
    }
  );
};

/**
 * Reverts the migration: drops 'employees' and 'positions' tables.
 *
 * @param {object} queryInterface - The Sequelize queryInterface object.
 * @returns {Promise<void>} Promise representing the completion of table deletion.
 */
export const down = async (queryInterface) => {
  // Drop 'employees' table
  await queryInterface.dropTable('employees', {
    schema: process.env.SCHEMA,
  });

  // Drop 'positions' table
  await queryInterface.dropTable('positions', {
    schema: process.env.SCHEMA,
  });
};
