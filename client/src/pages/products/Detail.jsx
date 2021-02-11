import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import ProdcutItem from './ProductItem'
import ReactStars from 'react-rating-stars-component'

const Detail = () => {
  //recebe o parametro da url que foi passado
  const params = useParams()

  //usando o contextGlobal - tudo que esta no value passado no arquivo GlobalState.js
  const state = useContext(GlobalState)

  //especifica oq dentro do estado estou querendo usar - obs: a constant {products} foi feito destructuring somente de produtos nao usando o setProducts
  const { products } = state.ProductsAPI.products

  //cria o estado "detailProduct" usando useState
  const [detailProduct, setDetailProduct] = useState([])

  //executa qnd a pagina eh carregada
  useEffect(
    () => {
      //verifica se existe algum parametro na url
      if (params.id) {
        //percorre o array de products
        products.forEach((product) => {
          //verifica se o produto percorrido tem o msm id do parametro passado na url
          if (product._id === params.id) {
            //se existir adiciona esse produto na constante de estado "detailProduct"
            setDetailProduct(product)
          }
        })
      }
    },
    [params.id, products] /*executa sempre que alterar params.id ou products*/
  )

  //verifica se a constante de estado "detailProduct" possui algum valor dentro do array
  //se for igual a 0 retorna nulo
  //caso for > 0 retorna um jsx
  return detailProduct.length === 0 ? null : (
    <>
      <div className='detail'>
        <img
          className='detail_img'
          src={detailProduct.images.url}
          alt={detailProduct.title}
        />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>R$ {detailProduct.price}</span>
          <blockquote>{detailProduct.description}</blockquote>
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={detailProduct.rate}
            isHalf={true}
            activeColor='#ffd700'
          />
          <p>Conteúdo: {detailProduct.content}</p>
          <p>Vendido: {detailProduct.sold}</p>
          <Link to='/cart' className='cart'>
            Comprar
          </Link>
        </div>
      </div>
      <div className='item_related'>
        <h3>Produtos relacionados</h3>
        <div className='products_related'>
          {/* percorre o array de products usando map */}
          {products.map((p) => {
            // verifica se a categoria percorrida tem o msm dado do detailProduct
            //se positivo ele chama o component produtoItem
            //caso negativo retorna nulo
            return p.category === detailProduct.category ? (
              <ProdcutItem key={p._id} product={p} />
            ) : null
          })}
        </div>
      </div>
    </>
  )
}
export default Detail
