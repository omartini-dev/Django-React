from .schema import MySchema


class MultiSerializerViewSetMixin(object):
    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.

        You may want to override this if you need to provide different
        serializations depending on the incoming request.

        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        return self.custom_serializer_classes.get(self.action, self.serializer_class)

    def get_query_serializer(self):
        return self.custom_query_serializer_classes.get(self.action, self.serializer_class)()


class MultiActionViewSetMixin(object):
    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.

        You may want to override this if you need to provide different
        serializations depending on the incoming request.

        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        return self.custom_serializer_classes.get(self.action, self.serializer_class)


class ViewQueryMixin(object):
    swagger_schema = MySchema

    def get_query_serializer(self):
        return self.query_serializer()
