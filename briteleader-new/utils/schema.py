from drf_yasg.inspectors import SwaggerAutoSchema

class MySchema(SwaggerAutoSchema):

    def get_query_serializer(self):
        """Return the query serializer (used for parsing query parameters) for this endpoint.

        :return: the query serializer, or ``None``
        """
        if self.should_filter():
            return self.view.get_query_serializer()
        else:
          return None