import faker from 'faker'

export function generateUserData(overide = {}) {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    dob: new Date(),
    ...overide
  }
}

export function generateUsersData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateUserData()
  });
}

export function generateUserPayload() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    dob: new Date(),
  }
}