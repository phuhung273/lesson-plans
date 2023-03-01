interface Database {
  getQuery(): string;
}

class MySQL implements Database {
  getQuery() {
    return "SELECT * FROM users";
  }
}

class MongoDB implements Database {
  getQuery() {
    return "db.users.find()";
  }
}

class DatabaseAfter {
  engine: Database;

  constructor(type: string) {
    if (type === "mysql") {
      this.engine = new MySQL();
    } else if (type === "mongodb") {
      this.engine = new MongoDB();
    }
  }

  get() {
    return this.engine.getQuery();
  }
}
