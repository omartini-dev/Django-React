from rest_framework import serializers


class ModelQuerySerializer(serializers.ModelSerializer):

    def build_standard_field(self, field_name, model_field):
        field_class, field_kwargs = super(ModelQuerySerializer, self).build_standard_field(field_name, model_field)
        field_kwargs['required'] = False
        return field_class, field_kwargs

class EmptySerializer(serializers.Serializer):
    class Meta:
        ref_name = "Empty"