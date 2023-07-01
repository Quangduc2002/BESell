const Order = require('../models/Order') 
const Orderitem = require('../models/Orderitem')
const nodemailer = require("nodemailer");

  // format tiền
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

class OrderController {
    //[POST] /order
    async addOrder(req, res, next){
        try {
            if(req.body.Product){
                Orderitem.findOne({})
                    .sort({_id: 'desc'})
                    .then( async(MaSP) => {
                        req.body.MaSp = MaSP.MaSp + 1
                        const orderItem = new Orderitem(req.body);
                        orderItem.save();
                        for(let item = 0; item < req.body.Product.length; item++) {
                            Orderitem.updateOne(
                                {$push: {
                                    Product: {
                                        qty:   req.body.Product[item].qty, 
                                        total: req.body.Product[item].total,
                                        Image: req.body.Product[item].Image,
                                        TenSp: req.body.Product[item].TenSp,
                                    }}
                                }
                            )
                        }
                        req.body.ProductOrder = orderItem._id
                        req.body.orderItem = req.body.MaSp
                        const order =  new Order(req.body);
                        order.save();
                    })
            }
            res.status(200).json("order success");
        } catch (error) {
            res.status(200).json("order error" );
        }
    }

    //[GET] /order/listOrder
    async getOrder (req, res, next){
        try{
            const save = await Order.find().populate("ProductOrder");
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }

    // /order/Email
    async sendEmail (req, res, next) {
            var TongSp = 0;
            for(let item = 0; item < req.body.orderProduct.ProductOrder[0].Product.length; item++) {
                TongSp += parseFloat(req.body.orderProduct.ProductOrder[0].Product[item].total)
            }

            // trạng thái mua hàng
            if(req.body.orderProduct._id){
                const searchOrder = Order.findById(req.body.orderProduct._id)
                await searchOrder.updateOne( {TrangThaiDH: req.body.TrangThaiDH})
            }

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "phamquangduc110@gmail.com" ,
                  pass: "ynmlgvjifkpsczvb"
                }
              });
        
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Quang Đức 👻" <phamquangduc110@gmail.com>', // sender address
                to: `${req.body.orderProduct.Email}`, // list of receivers
                subject: "Thông tin mua sản phẩm", // Subject line
                text: "Hello world?", // plain text body
                // html body
                html:  `
                    <h3>Xin chào bạn ${req.body.orderProduct.TenKH}</h3>
                    <p>Bạn nhận được Email này vì bạn đã được xác nhận mua sản phẩm của bên chúng tôi.Sản phẩm sẽ được giao đến bạn từ 2-3 ngày</p>
                    <p>Thông tin về ${req.body.orderProduct.ProductOrder[0].Product.length} sản phẩm của bạn:</p>
                    ${req.body.orderProduct.ProductOrder[0].Product.map((product) => {
                        return ( 
                            `
                            <div>
                                <b>Tên sản phẩm: ${product.TenSp}</b>
                                <br/>
                                <b>Số lượng: x${product.qty}</b>
                                <br/>
                                <b>Tổng tiền của sản phẩm: ${VND.format(product.total)}</b>
                            </div>
                           `
                        )
                    })}
                    <p>
                        <b>Tổng đơn hàng của bạn: ${VND.format(TongSp)}</b>
                    </p>
                    <div>Nếu thông tin sản phẩm chưa chính xác.Vui lòng bạn liên hệ tới
                        <b>
                        Hotline: 0965420922
                        </b>
                    </div>
                    <div>Xin chân thành cảm ơn !</div>
                `, 
            });
        res.status(200).json(" success");
    }
}

module.exports = new OrderController();