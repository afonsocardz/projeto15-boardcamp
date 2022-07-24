import { Router } from "express";
import offsetQuery from "../utils/offsetQueryMiddleware.js";
import { createCustomer, getCustomers, getCustomersById, updateCustomer } from "./customersController.js";
import { createCustomerValidation, getCustomerQuery, updateCustomerValidaton } from "./customersMiddleware.js";


const route = Router();

route.get("/", getCustomerQuery, offsetQuery, getCustomers);
route.get("/:id", getCustomersById);
route.post("/", createCustomerValidation, createCustomer);
route.put("/:id", updateCustomerValidaton, updateCustomer)

export default route;