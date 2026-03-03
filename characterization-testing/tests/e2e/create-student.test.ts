import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';
import request, { type Response } from 'supertest';

import { app } from '../../src';
import { resetDatabase } from '../fixtures/reset';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/create_student.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  let requestBody: { name?: string; email: string };
  let response: Response;

  test('Successfully create a student', ({ given, when, then }) => {
    given(
      /^I want to create a student with name "(.*)" and email "(.*)"$/,
      (name, email) => {
        requestBody = {
          name,
          email,
        };
      },
    );

    when('I send a request to create a student', async () => {
      response = await request(app)
        .post('/students')
        .send(requestBody);
    });

    then(
      'the new student record should be created successfully',
      () => {
        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe(requestBody.name);
        expect(response.body.data.email).toBe(requestBody.email);
      },
    );
  });

  test('Missing required fields', ({ given, when, then }) => {
    given(
      /^I want to create a student with no name and email "(.*)"$/,
      (email) => {
        requestBody = {
          email,
        };
      },
    );

    when('I send a request to create a student', async () => {
      response = await request(app)
        .post('/students')
        .send(requestBody);
    });

    then('the new student record should not be created', () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ValidationError');
    });
  });
});
