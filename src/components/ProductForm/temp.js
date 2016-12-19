<div>
  <label className={styles.name}> name
    <input type="text" className="form-control" {...name}/>
  </label>

  <label className={styles.price}> price
    <input type="text" className="form-control" {...price}/>
  </label>

  <label className={styles.number}> number
    <input type="text" className="form-control" {...inStock}/>
  </label>

  <label className={styles.image}> image
    <input type="text" className="form-control" {...images}/>
  </label>

  <label className={styles.description}> description
    <input type="text" className="form-control" {...description}/>
  </label>

  {
    onAddProduct.properties.map((property) =>
        <label key={property.name} className={styles.property}> {property.name}
          {/* <Field name={property.name}*/}
          {/* component="input"*/}
          {/* type="text"*/}
          {/* placeholder="Last Name"*/}
          {/* value={property.name}*/}
          {/* />*/}
          {/* <input type="text" className="form-control"/>*/}
        </label>
    )
  }
  <button className="btn btn-success btn-sm"
          onClick={() => addProduct({
            'name': values.name,
            'price': values.price,
            'inStock': values.inStock,
            description,
            images,
          }, onAddProduct.id)}>
    <i className={'glyphicon glyphicon-ok'}/>
  </button>

  <button className="btn btn-default btn-sm" onClick={() => addStopProduct()}>
    <i className="glyphicon glyphicon-remove"/>
  </button>
</div>