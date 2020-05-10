const {
    Answers,
    Users,
    Questions
} = require('../../data');

const {
    sendEmail
} = require('../../mailer/mailerService');

const post = async (question_id, username, message) => {
    const user = await Users.findOne({'username': username});

    if (user == null) {
        throw new ServerError("User not found", 404);
    }

    const answer = new Answers({
        user_id: user._id,
        question_id: question_id,
        message: message
    });

    const question = await Questions.findById(question_id).populate('user_id', 'username email -_id');

    await answer.save();
    sendEmail(question.user_id.email, "Your question got answered:\n" + message);
};

module.exports = {
    post,
}