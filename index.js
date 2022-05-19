const express = require("express");
const app = express();
const PORT = 3000;

// Make the public folder available to the world
app.use(express.static("public"));

// This is used in the innerData below.
let viewCount = 0;

// This data is available to the client through the example API.
// Data can be standard content, or it can be dynamically generated with a function.
const innerData = {
  body: `<p class="info">This text is from the API. You can see it in the innerData constant in index.js</p>`,
  viewCount: () => {
    ++viewCount;
    return viewCount.toString();
  },
};

// This is the endpoint that the client can call to get data from the innerData object above.
app.get("/api/inner/id=:id", (req, res) => {
  const id = req.params.id;
  if (innerData[id]) {
    let data = innerData[id];
    if (data.constructor === Function) {
      data = data();
    }
    res.send(data);
  } else {
    res.status(404).send("Not Found");
  }
});

// Start the server.
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
