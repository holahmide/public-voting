/* eslint-disable no-console */
/// <reference path="../index.d.ts" />
import dotenv from 'dotenv';
import prompt from 'prompt';
import { INITIALIZE_DB } from '../config';
import { generateArrayOfLength } from '../utils';
import getCreateUserPromise from './User';
import getCreateSessionPromise from './Session';
// configure .env
dotenv.config();

type PopulateOptions = 'USR' | 'SES';
const POPULATE_OPTIONS: PopulateOptions[] = ['USR', 'SES'];
const POPULATE_OPTIONS_DISPLAY = `(${POPULATE_OPTIONS.reduce(
  // @ts-ignore
  (a, b) => `${a} | ${b}`
)})`;

(async () => {
  try {
    await INITIALIZE_DB();
    console.log(
      `\n What database instance would you like to populate ${POPULATE_OPTIONS_DISPLAY}`
    );
    prompt.start();
    prompt.get(
      {
        name: 'option',
        enum: POPULATE_OPTIONS,
        message: `Invalid option, options are ${POPULATE_OPTIONS_DISPLAY}!`,
        description: 'What database instance',
      },
      // eslint-disable-next-line consistent-return
      async (err, mainResult: { option: PopulateOptions }) => {
        if (err) {
          console.log(err);
          return 1;
        }
        switch (mainResult.option) {
          case 'USR':
            prompt.get(
              {
                name: 'count',
                pattern: '^(0|[1-9][0-9]*)$',
                description: 'Number of users you want to create',
                message: 'Numbers only!',
              },
              // eslint-disable-next-line consistent-return
              async (error, result) => {
                if (error) {
                  console.log(error);
                  return 1;
                }
                const count = Number(result.count);
                const createUsers = generateArrayOfLength(count).map((_: any) =>
                  getCreateUserPromise()
                );
                await Promise.all(createUsers).then(() => {
                  console.log(`${count} USER(S) CREATED ✨`);
                  process.exit();
                });
              }
            );
            break;
          case 'SES':
            prompt.get(
              {
                name: 'count',
                pattern: '^(0|[1-9][0-9]*)$',
                description: 'Number of sessions you want to create',
                message: 'Numbers only!',
              },
              // eslint-disable-next-line consistent-return
              async (error, result) => {
                if (error) {
                  console.log(error);
                  return 1;
                }
                const count = Number(result.count);
                const createSessions = generateArrayOfLength(count).map(
                  (_: any) => getCreateSessionPromise()
                );
                await Promise.all(createSessions).then(() => {
                  // eslint-disable-next-line no-console
                  console.log(`${count} SESSION(S) CREATED ✨`);
                  process.exit();
                });
              }
            );
            break;
          default:
            throw new Error(
              `Invalid option, options are ${POPULATE_OPTIONS_DISPLAY}`
            );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
})();
