import Email from "../models/userModel.js";
import mailServices from "../connections/mailServices.js";
let handelAddNewEmail = async (req, res) => {
  let { email } = req.body;

  try {
    let findEmail = await Email.findOne({ email });
    if (findEmail) return res.send("email id already exists");
    let addEmail = await Email.create({
      email,
    });
    let welcomeMessage = `"Welcome to QuoteQuest!"\n"Thank you for subscribing to our daily quotes service. Get ready to start your mornings with a dose of inspiration and wisdom. Each day, we will send you a handpicked quote, carefully selected to uplift your spirits, spark creativity, and bring positivity to your day.\n
    
    At QuoteQuest, we believe that a single quote has the power to transform your perspective and motivate you to make the most out of every moment. With our daily emails, you'll receive a fresh quote each morning, right in your inbox, waiting to kickstart your day on a positive note.\n

We are thrilled to have you join our community of quote enthusiasts. Whether you're seeking motivation, wisdom, or simply a moment of reflection, our daily quotes are here to accompany you on your journey.\n

Thank you for choosing us to be a part of your daily routine. Expect our first quote to arrive in your inbox tomorrow morning. Get ready to be inspired!\n

Wishing you a day filled with joy and wisdom,\n

The QuoteQuest Team"`;

    mailServices(
      email,
      "Thank you for subscribing to our daily quotes service.",
      welcomeMessage
    );
    res.status(201).json({ status: "ok", message: "email added" });
  } catch (error) {
    res.send(error.message);
  }
};

let handelGetAllEmail = async (req, res) => {
  try {
    let findAllEmail = await Email.find({});
    let arr = [];
    findAllEmail.map((item) => {
      arr.push(item.email);
    });
    console.log(arr);
    res.send(arr);
  } catch (error) {
    res.send(error.message);
  }
};

export { handelAddNewEmail, handelGetAllEmail };
