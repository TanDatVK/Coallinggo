# 🎓 Coerlingo AI - Hướng Dẫn Sử Dụng

> **AI Coding Tutor** - Dạy lập trình như Duolingo!

---

## 📋 Mục Lục

1. [Giới Thiệu](#-giới-thiệu)
2. [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
3. [Cài Đặt](#-cài-đặt)
4. [Chạy API Server](#-chạy-api-server)
5. [Sử Dụng API](#-sử-dụng-api)
6. [Inference Trực Tiếp](#-inference-trực-tiếp)
7. [Quản Lý Knowledge Base](#-quản-lý-knowledge-base)
8. [Cấu Trúc Project](#-cấu-trúc-project)
9. [Troubleshooting](#-troubleshooting)

---

## 🎯 Giới Thiệu

Coerlingo AI là một AI tutor dạy lập trình, được fine-tune từ **Llama-3.2-3B-Instruct** với:

- **25,000 bài học** có cấu trúc JSON
- **5 ngôn ngữ**: Python, C++, Java, JavaScript, Rust
- **5 mức độ khó**: Beginner → Expert
- **RAG System**: 1,607 documents kiến thức

### Output Format

Model trả về JSON với cấu trúc:

```json
{
  "type": "lesson_unit",
  "language": "Python",
  "topic": "for loop",
  "difficulty_level": 2,
  "difficulty": "Elementary",
  "content": {
    "title": "Vòng lặp for trong Python",
    "flashcards": [
      {"type": "theory", "front": "...", "back": "..."},
      {"type": "code", "front": "...", "back": "..."}
    ],
    "quizzes": [
      {"type": "quiz", "question": "...", "options": [...], "correct": 0},
      {"type": "bug_hunt", "question": "...", "buggy_code": "...", "options": [...], "correct": 1}
    ]
  }
}
```

---

## 💻 Yêu Cầu Hệ Thống

| Yêu cầu | Tối thiểu | Khuyến nghị |
|---------|-----------|-------------|
| GPU VRAM | 6GB | 8GB+ |
| RAM | 16GB | 32GB |
| Disk | 20GB | 50GB |
| Python | 3.10+ | 3.11 |
| CUDA | 11.8+ | 12.1 |

---

## 📦 Cài Đặt

### 1. Clone/Download Project

```powershell
cd C:\Users\Admin\Desktop\MODEL-AI\ai-training
```

### 2. Cài Đặt Dependencies

```powershell
pip install -r requirements.txt
pip install fastapi uvicorn chromadb sentence-transformers
```

### 3. Kiểm Tra Model

Model đã được train và lưu tại:
```
./outputs/final_model/
```

### 4. Ingest Knowledge Base (Nếu Chưa Có)

```powershell
python -m rag.ingest
```

---

## 🚀 Chạy API Server

### Khởi Động Server

```powershell
cd C:\Users\Admin\Desktop\MODEL-AI\ai-training
python -m api.main
```

Server sẽ:
1. Load model vào GPU memory (~15-20 giây)
2. Khởi động FastAPI server
3. Sẵn sàng nhận requests

### Output Khi Thành Công

```
============================================================
🚀 Coerlingo AI API Server Starting...
============================================================

📦 Preloading model into GPU memory...
Loading model from ./outputs/final_model...
Model loaded!

✅ Server ready! Model loaded and cached.
============================================================
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Truy Cập

| URL | Mô tả |
|-----|-------|
| http://localhost:8000 | Root endpoint |
| http://localhost:8000/docs | Swagger UI (API Docs) |
| http://localhost:8000/health | Health check |

---

## 📡 Sử Dụng API

### 1. Health Check

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health"
```

Response:
```json
{
  "status": "ok",
  "model_loaded": true,
  "rag_loaded": true,
  "gpu_available": true
}
```

### 2. Generate Lesson

```powershell
$body = @{
    topic = "for loop"
    language = "python"
    difficulty_level = 2
    use_rag = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/lessons/generate" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### 3. Chat với AI

```powershell
$body = @{
    message = "Explain decorators in Python"
    language = "python"
    use_rag = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/chat" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### 4. RAG Statistics

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/health/rag/stats"
```

Response:
```json
{
  "total_documents": 1607,
  "by_language": {
    "python": 634,
    "cpp": 272,
    "java": 218,
    "javascript": 241,
    "rust": 242
  }
}
```

### 5. Supported Languages

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/languages"
```

---

## 🔧 Inference Trực Tiếp

### Chạy Không Cần API Server

#### Interactive Mode (Khuyên dùng)

```powershell
python scripts/rag_inference.py --interactive
```

Commands trong interactive mode:
- `/stats` - Xem knowledge base stats
- `/norag [query]` - Generate không dùng RAG
- `/quit` - Thoát

#### Single Query

```powershell
python scripts/rag_inference.py --prompt "Explain Python decorators"
```

#### Without RAG

```powershell
python scripts/rag_inference.py --prompt "Explain for loop" --no-rag
```

---

## 📚 Quản Lý Knowledge Base

### Thêm Documents Mới

1. Tạo file `.md` trong thư mục tương ứng:
```
rag/knowledge_base/
├── python/
├── cpp/
├── java/
├── javascript/
└── rust/
```

2. Re-ingest:
```powershell
python -m rag.ingest
```

### Kiểm Tra Stats

```powershell
python scripts/rag_inference.py --stats
```

### Knowledge Base Hiện Tại

| Ngôn ngữ | Documents | Nội dung |
|----------|-----------|----------|
| Python | 634 | Core, Advanced, Errors, Best Practices, Stdlib |
| C++ | 272 | Core, Advanced, Errors, Best Practices, Stdlib |
| Java | 218 | Core, Advanced, Errors, Best Practices, Stdlib |
| JavaScript | 241 | Core, Advanced, Errors, Best Practices, Stdlib |
| Rust | 242 | Core, Advanced, Errors, Best Practices, Stdlib |

---

## 📁 Cấu Trúc Project

```
ai-training/
├── api/                    # FastAPI Server
│   ├── main.py            # Entry point
│   ├── schemas.py         # Request/Response models
│   ├── dependencies.py    # Model manager
│   └── routers/
│       ├── health.py      # Health endpoints
│       └── lessons.py     # Lesson endpoints
│
├── rag/                    # RAG System
│   ├── config.py          # Configuration
│   ├── embeddings.py      # Embedding model
│   ├── vector_store.py    # ChromaDB wrapper
│   ├── retriever.py       # Document retriever
│   ├── pipeline.py        # RAG + Model pipeline
│   ├── ingest.py          # Knowledge ingestion
│   └── knowledge_base/    # Documents
│       ├── python/
│       ├── cpp/
│       ├── java/
│       ├── javascript/
│       └── rust/
│
├── scripts/
│   ├── finetune.py        # Training script
│   ├── inference.py       # Basic inference
│   ├── rag_inference.py   # RAG-enhanced inference
│   ├── prepare_data.py    # Data preparation
│   └── batch_train.py     # Multi-language training
│
├── outputs/
│   └── final_model/       # Fine-tuned model
│
└── data/
    ├── raw/               # Raw training data
    └── processed/         # Processed data
```

---

## ❓ Troubleshooting

### Model không load được

```
Error: CUDA out of memory
```

**Giải pháp**: 
- Đóng các ứng dụng GPU khác
- Giảm `max_new_tokens` trong generation

### ChromaDB Error

```
Error: Collection not found
```

**Giải pháp**:
```powershell
python -m rag.ingest
```

### Slow Inference

**Lý do**: Model chưa được preload

**Giải pháp**: Sử dụng API Server thay vì scripts riêng lẻ

### Port Already in Use

```
Error: Address already in use
```

**Giải pháp**:
```powershell
# Tìm process
netstat -ano | findstr :8000

# Kill process (thay PID)
taskkill /PID <PID> /F
```

---

## 📞 API Reference Chi Tiết

### POST /api/lessons/generate

Tạo bài học cho topic cụ thể.

**Request Body:**
```json
{
  "topic": "string",        // Bắt buộc: Chủ đề
  "language": "string",     // Bắt buộc: python|cpp|java|javascript|rust
  "difficulty_level": 1-5,  // Tùy chọn, default: 1
  "use_rag": true          // Tùy chọn, default: true
}
```

**Response:**
```json
{
  "success": true,
  "lesson": { /* JSON lesson */ },
  "rag_sources": ["source1...", "source2..."],
  "error": null
}
```

### POST /api/chat

Chat tự do với AI tutor.

**Request Body:**
```json
{
  "message": "string",      // Bắt buộc: Câu hỏi
  "language": "string",     // Tùy chọn: Filter RAG
  "use_rag": true          // Tùy chọn, default: true
}
```

---

## 🎉 Quick Start

```powershell
# 1. Vào thư mục project
cd C:\Users\Admin\Desktop\MODEL-AI\ai-training

# 2. Chạy server
python -m api.main

# 3. Mở browser
# http://localhost:8000/docs

# 4. Test API trong Swagger UI!
```

---

**Happy Coding with Coerlingo AI! 🚀**
