import fs from 'fs/promises';
import path from 'path';

// Đường dẫn đến thư mục Data
const dataDir = './Data';

// Hàm đọc nội dung file
async function readFileContent(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Lỗi khi đọc file ${filePath}:`, error);
    return '';
  }
}

// Hàm chuyển đổi dữ liệu thô thành JSON
async function convertToJson() {
  const books = [];

  // Đọc danh sách thư mục Category
  const categories = await fs.readdir(dataDir);
  
  for (const category of categories) {
    const categoryPath = path.join(dataDir, category);
    const stat = await fs.stat(categoryPath);
    
    if (!stat.isDirectory()) continue; // Bỏ qua nếu không phải thư mục

    // Đọc danh sách thư mục Book trong Category
    const bookDirs = await fs.readdir(categoryPath);
    
    for (const bookDir of bookDirs) {
      const bookPath = path.join(categoryPath, bookDir);
      if (!(await fs.stat(bookPath)).isDirectory()) continue;

      // Đọc author.txt và name.txt
      const author = await readFileContent(path.join(bookPath, 'author.txt'));
      const title = await readFileContent(path.join(bookPath, 'name.txt'));

      // Đọc thư mục Chapter
      const chapterDir = path.join(bookPath, 'Chapter');
      const chapterFiles = await fs.readdir(chapterDir);
      const chapters = [];

      for (const chapterFile of chapterFiles) {
        if (!chapterFile.endsWith('.txt')) continue;
        
        const chapterContent = await readFileContent(path.join(chapterDir, chapterFile));
        const chapterNumber = parseInt(chapterFile.match(/\d+/)[0], 10); // Lấy số từ tên file (chapter1.txt -> 1)
        
        chapters.push({
          title: `Chương ${chapterNumber}`,
          order: chapterNumber,
          content: chapterContent,
          comments: [], // Không có bình luận trong dữ liệu thô
        });
      }

      // Sắp xếp chapters theo order
      chapters.sort((a, b) => a.order - b.order);

      // Tạo object book theo schema
      books.push({
        title: title || `Sách ${bookDir}`,
        author: author || 'Tác giả không xác định',
        genres: [{ name: category }], // Lấy category làm genre
        images: [{ path: 'https://example.com/default.jpg' }], // Giá trị mặc định
        description: 'Mô tả mặc định', // Giá trị mặc định
        status: 'completed', // Giá trị mặc định
        chapters,
      });
    }
  }

  // Ghi dữ liệu JSON ra file
  await fs.writeFile('books.json', JSON.stringify(books, null, 2));
  console.log('Đã tạo file books.json');
}

convertToJson().catch(console.error);