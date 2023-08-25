import express from "express";
import productsRouter from "./routes/productsRouter";
import cartRouter from "./routes/cartItemRouter";
import userRouter from "./routes/usersRouter";
import cors from "cors";

const app = express();

// Setting up API
app.use(express.json());

app.use(cors());
app.use("", productsRouter);
app.use("", cartRouter);
app.use("", userRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));

// Keep this line. It is added for our testing purposes.
export default app;
