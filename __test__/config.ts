import type { Config } from 'jest'


const config: Config = {
  preset: 'ts-jest',
  testEnvironment: "node",
  collectCoverage: true,
  rootDir: "../"
}

export default config