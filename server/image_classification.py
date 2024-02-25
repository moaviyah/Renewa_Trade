from flask import Flask, request, jsonify
import numpy as np
import io
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

base_model = ResNet50(weights='imagenet', include_top=False)
# Freeze the base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom classification layers
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(1024, activation='relu')(x)
output = Dense(4, activation='softmax')(x)  # Adjust output units for your specific classes

model = Model(inputs=base_model.input, outputs=output)

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

app = Flask(__name__)

class_labels = ['wood', 'plastic', 'glass', 'cement']  # Define your class labels

@app.route('/classify-image', methods=['POST'])
def classify_image():
   
    image_file = request.files['image']
    image_stream = io.BytesIO(image_file.stream.read())
    print('image file', image_file, 'stream', image_stream )
    img = image.load_img(image_stream, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = base_model.predict(x)
    # Decode predictions
    predicted_class_index = np.argmax(np.array(preds))
    print('predicted index', predicted_class_index)
    predicted_class = class_labels[predicted_class_index]
    return jsonify({'predictions': predicted_class})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
