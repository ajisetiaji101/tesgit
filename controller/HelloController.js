class HelloController {
  static async getHello(req, res) {
    res.status(200).json({ data: "Hello World" });
  }
}

module.exports = HelloController;
