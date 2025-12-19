export default function ComoComprarPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-10 text-center">
        Cómo comprar
      </h1>

      <div className="space-y-10 text-muted-foreground text-base leading-relaxed">
        {/* Paso 1 */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            1. Explorá nuestros productos
          </h2>
          <p>
            Navegá por nuestra tienda online y descubrí todas nuestras
            joyas de acero. Podés filtrar por categorías y ver el
            detalle de cada producto antes de agregarlo a tu pedido.
          </p>
        </div>

        {/* Paso 2 */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            2. Armá tu pedido
          </h2>
          <p>
            Agregá al carrito todos los productos que desees.
            Desde allí podés ajustar cantidades, eliminar artículos
            o seguir sumando productos antes de continuar.
          </p>
        </div>

        {/* Paso 3 */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            3. Enviá tu pedido por WhatsApp
          </h2>
          <p>
            Cuando tu pedido esté listo, hacé clic en{" "}
            <strong>“Confirmar pedido por WhatsApp”</strong>.
            Serás redirigido automáticamente a nuestro WhatsApp con
            el detalle completo del pedido ya armado.
          </p>
        </div>

        {/* Paso 4 */}
        <div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            4. Confirmación y coordinación
          </h2>
          <p>
            A través de WhatsApp confirmamos la disponibilidad de stock,
            el precio final y coordinamos la forma de pago y envío o retiro.
            Esto nos permite brindarte una atención personalizada y rápida.
          </p>
        </div>
      </div>

      {/* Nota importante */}
      <div className="mt-12 rounded-xl border p-6 bg-muted/30 text-sm text-muted-foreground">
        <p>
          <strong>Importante:</strong> los pedidos realizados a través de
          la tienda están sujetos a confirmación de stock.
          El pedido no se considera confirmado hasta que nuestro equipo
          lo valida por WhatsApp.
        </p>
      </div>
    </section>
  );
}