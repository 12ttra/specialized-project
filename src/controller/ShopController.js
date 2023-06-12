const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const shop_model = require("../model/shop_model")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class ShopController{
    index(req, res){
        return res.render('pages/myshop', { title: 'My Store' });
      }

    async signUp(name, email, password){
        try{
            // step 1: check mail exists
            const holderShop = await shop_model.findOne({ email }).lean()
            if(holderShop){
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shop_model.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if(newShop){
                //created privateKey, publicKey
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })

                console.log({privateKey, publicKey})
            }

        } catch (error){
            return{
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

    // async signUp (req, res, next){
    //     try{
    //         console.log(`[P]::signUp::`, req.body)
    //         /*
    //             200 OK
    //             201 CREATED
    //         */
    //        return res.status(201).json({
    //         code: '20001',
    //         metadata: {useerid: 1}
    //        })
    //     }
    //     catch(error){
    //         next(error)
    //     }
    // } 

}

module.exports = new ShopController;