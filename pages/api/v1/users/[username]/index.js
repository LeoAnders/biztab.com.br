import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user";

const router = createRouter();

export default router.handler(controller.errorHandlers);

router.get(getUserHandler);
router.patch(patchUserHandler);

async function getUserHandler(request, response) {
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);
  return response.status(200).json(userFound);
}

async function patchUserHandler(request, response) {
  const username = request.query.username;
  const userInputValues = request.body;

  const updatedUser = await user.update(username, userInputValues);
  return response.status(200).json(updatedUser);
}
