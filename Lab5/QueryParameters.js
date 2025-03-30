export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      let result = 0;
      const x = parseFloat(a);
      const y = parseFloat(b);
  
      switch (operation) {
        case "add":
          result = x + y;
          break;
        case "subtract":
          result = x - y;
          break;
        case "multiply":
          result = x * y;
          break;
        case "divide":
          result = y !== 0 ? x / y : "Cannot divide by zero";
          break;
        default:
          result = "Invalid operation";
      }
  
      res.send(result.toString());
    });
  }
  