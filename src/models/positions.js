import { DataTypes, literal } from 'sequelize';
import sequelize from '../config/database';

const { STRING, BOOLEAN } = DataTypes;

// Define the 'positions' model
const positions = sequelize.define(
  'positions',
  {
    name: {
      type: STRING,
      allowNull: false, // Position name must be provided
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

// Export the 'positions' model
export default positions;
