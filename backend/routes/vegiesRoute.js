import express from 'express';
import { Vegi } from '../models/vmodels.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { foodname, quantity, price, image, discount, total } = request.body;

        // Ensure all required fields are present
        if (!foodname || !quantity || !price || !image) {
            return response.status(400).send({
                message: 'Send all required fields: foodname, quantity, price, image',
            });
        }

        // Create a new vegetable with the provided data
        const newvegi = {
            foodname,
            quantity,
            price,
            image,
            discount,
            total,
        };

        // Save the new vegetable to the database
        const vegi = await Vegi.create(newvegi);

        return response.status(201).send(vegi);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Rout for Get All vegies from database
router.get('/', async (request, response) => {
    try {
        const vegies = await Vegi.find({});

        return response.status(200).json({
            count: vegies.length,
            data: vegies
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

// Rout for Get one vegi from database by ID
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const vegi = await Vegi.findById(id);

        return response.status(200).json(vegi);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});


router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { foodname, quantity, price, image, discount, total } = request.body;

        const result = await Vegi.findByIdAndUpdate(id, {
            foodname,
            quantity,
            price,
            image,
            discount,
            total
        }, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Vegetable not found' });
        }

        return response.status(200).send({ message: 'Vegetable updated successfully', vegi: result });
    } catch (error) {
        console.error('Error updating vegetable:', error.message);
        response.status(500).send({ message: 'Server error', error: error.message });
    }
});



router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Vegi.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Food not found' });
        }
        return response.status(200).send({ message: 'Food delete successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
