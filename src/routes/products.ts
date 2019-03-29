import { Router, Request, Response } from 'express';
const router = Router();

// Model
import Product from '../models/Product';

router.route('/create')
    .get((req: Request, res: Response) => {
        res.render('products/create');
    })
    .post(async (req: Request, res: Response) => {
        const { name, price, image, description } = req.body;
        const product = new Product({ name, price, image, description });
        await product.save();
        res.redirect('/products/list');
    });

router.route('/list')
    .get(async (req: Request, res: Response) => {
        const products = await Product.find();
        res.render('products/list', { products });
    });

router.route('/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products/list');
    });

router.route('/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        console.log(product)
        res.render('products/edit', { product });
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, price, image, description } = req.body;
        await Product.findByIdAndUpdate(id, {
            name, price, image, description
        });
        res.redirect('/products/list');
    })

export default router;