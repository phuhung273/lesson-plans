class DatabaseBefore {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  get() {
    if (this.type === "mysql") {
      return "SELECT * FROM users";
    } else if (this.type === "mongodb") {
      return "db.users.find()";
    }

    return null;
  }
}
