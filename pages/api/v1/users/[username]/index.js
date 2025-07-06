import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user";

const router = createRouter();

export default router.handler(controller.errorHandlers);

router.get(getUsersHandle);

async function getUsersHandle(request, response) {
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);
  return response.status(200).json(userFound);
}
