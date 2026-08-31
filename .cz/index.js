const TYPES = require("./types.json");

const MAX_SUBJECT_LENGTH = 100;

const COMMIT_TEMPLATE = `<emoji> <type><scope>: <subject>

<body>

<footer>`;

const questions = [
  {
    type: "list",
    name: "type",
    message: "Select the type of change:",
    choices: TYPES.map(({ emoji, type, description }) => ({
      name: `${emoji} ${type}: ${description}`,
      value: type,
    })),
  },
  {
    type: "input",
    name: "scope",
    message: "Scope:",
    default: "",
  },
  {
    type: "input",
    name: "subject",
    message: "Subject:",
    transformer(value) {
      return `(${value.length}/${MAX_SUBJECT_LENGTH}) ${value}`;
    },
    validate(value) {
      const length = value.trim().length;

      if (length === 0) {
        return "Subject is required.";
      }

      if (length > MAX_SUBJECT_LENGTH) {
        return `Subject must be ${MAX_SUBJECT_LENGTH} characters or less. Current: ${length}`;
      }

      return true;
    },
  },
  {
    type: "input",
    name: "body",
    message: "Body (use | for line breaks):",
    default: "",
  },
  {
    type: "input",
    name: "breaking",
    message: "Breaking changes:",
    default: "",
  },
  {
    type: "input",
    name: "issues",
    message: "Issues resolved:",
    default: "",
  },
];

module.exports = {
  prompter(cz, commit) {
    cz.prompt(questions).then((answers) => {
      const selected = TYPES.find(({ type }) => type === answers.type);

      if (!selected) {
        throw new Error(`Unknown commit type: ${answers.type}`);
      }

      const scope = answers.scope.trim();
      const subject = answers.subject.trim();

      const body = answers.body
        .trim()
        .split("|")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n");

      const breaking = answers.breaking.trim();
      const issues = answers.issues.trim();

      const footer = [
        breaking ? `BREAKING CHANGE: ${breaking}` : "",
        issues ? `Closes ${issues}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const commitMessage = COMMIT_TEMPLATE.replace("<emoji>", selected.emoji)
        .replace("<type>", selected.type)
        .replace("<scope>", scope ? `(${scope})` : "")
        .replace("<subject>", subject)
        .replace("<body>", body)
        .replace("<footer>", footer)
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      commit(commitMessage);
    });
  },
};
