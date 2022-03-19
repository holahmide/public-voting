/* eslint-disable no-console */
import mongoose from 'mongoose';
import { DB_URL, DB_USER_ROLES } from '.';
import Role from '../models/User/role';

const isTest = process.env.NODE_ENV === 'test';

const InitializeDB = async () => {
  // Create user roles
  const setInitialRoles = async () => {
    DB_USER_ROLES.forEach(async (role) => {
      try {
        const exists = await Role.exists({ name: role });
        if (!exists) {
          await Role.create({ name: role });
          if (!isTest) {
            console.log(
              `\n role ${role.toUpperCase()} successfully created 🚀`
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  try {
    const data = await mongoose.connect(DB_URL, {
      family: 4,
    });
    console.log(
      `\n Successfully connected to MongoDB ✅ (${data.connection.name})`
    );
    await setInitialRoles();
  } catch (err) {
    console.error('\n Connection error ❌', err);
    await mongoose.connection.close();
  }
};

export default InitializeDB;
