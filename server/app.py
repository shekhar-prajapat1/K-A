import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://lead-enrich-data.vercel.app", "http://localhost:3000"], supports_credentials=True)

# Load and verify API key
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("API key missing. Please set the GOOGLE_API_KEY environment variable.")

# Configure the AI model
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/enrich', methods=['POST'])
def enrich_company_data():
    try:
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "Missing input data"}), 400

        company_name = request_data.get('company_name')
        website = request_data.get('website')

        if not company_name or not website:
            return jsonify({"error": "Company name and website are required"}), 400

        # Construct the prompt for the AI model
        prompt = f"""
        Provide a detailed profile for {company_name} with the website: {website}. 
        The response should be in JSON format, with the following structure:
        {{
            "company_name": "{company_name}",
            "website": "{website}",
            "description": "A brief description",
            "industry": "Primary industry",
            "estimated_size": "Approximate number of employees",
            "products_services": ["Service or product 1", "Service or product 2"],
            "headquarters": "Company location, if known",
            "year_founded": "Founding year, if known",
            "key_features": ["Feature 1", "Feature 2"]
        }}
        """

        # Generate content from the AI model
        response = model.generate_content(prompt)
        generated_text = response.text.strip()

        # Parse the AI response as JSON
        try:
            if generated_text.startswith('```json'):
                generated_text = generated_text[7:-3]
            enriched_data = json.loads(generated_text)
            return jsonify(enriched_data), 200
        except json.JSONDecodeError as parse_error:
            return jsonify({
                "error": "Error parsing AI response",
                "details": str(parse_error),
                "raw_response": generated_text
            }), 500

    except genai.types.generation_types.GenerationException as e:
        return jsonify({"error": "AI model generation error", "details": str(e)}), 500
    except Exception as e:
        return jsonify({
            "error": "An unexpected server error occurred",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
