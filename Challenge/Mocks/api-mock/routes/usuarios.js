import {Router} from 'express'
import { UserApiMock } from '../api/UserAPIMock.js'

const instance = new UserApiMock()
const router = Router()

router.post('/popular',(req,res)=> {
    try{
        res.json(instance.popular(parseInt(req.query.cant)))
    } catch(error) {
        next(error)
    }
})
router.get('/',(req,res,next)=> {
    try{
        res.json(instance.listarAll())
    } catch(error) {
        next(error)
    }
})
router.get('/:id',(req,res,next)=> {
    try{
        res.json(instance.listar(parseInt(req.query.id)))
    } catch(error) {
        next(error)
    }
})
router.post('/',(req,res,next)=> {
    try{
        res.json(instance.guardar(req.body))
    } catch(error) {
        next(error)
    }
})
router.put('/:id',(req,res,next)=> {
    try{
        res.json(instance.actualizar({ id: parseInt(req.params.id), ...req.body }))
    } catch(error) {
        next(error)
    }
})
router.delete('/:id',(req,res,next)=> {
    try{
        res.json(instance.borrar(parseInt(req.query.id)))
    } catch(error) {
        next(error)
    }
})

export default router