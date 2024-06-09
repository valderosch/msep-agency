const Ticket = require("../models/ticket");

class SupportController {
    async openNewTicket(req, res) {
        try {
            const { title, description } = req.body;
            const ticket = new Ticket({ title, description, user: req.user.id });
            await ticket.save();
            return res.json(ticket);
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "SERVER | Error while [creating] ticket"
            });
        }
    }

    async closeTicket(req, res) {
        try {
            const { ticketId } = req.body;
            await Ticket.findByIdAndDelete(ticketId);
            return res.json({ message: "Ticket closed" });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "SERVER | Error while [deleting] ticket"
            });
        }
    }
}

module.exports = new SupportController();
