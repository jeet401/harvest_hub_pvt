import { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './ImageWithFallback';

export function ChatPage({ currentUser, recipient, crop }) {
  const [message, setMessage] = useState('');
  
  // Safety check
  if (!recipient || !currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Unable to load chat. Please try again.</p>
        </div>
      </div>
    );
  }
  
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: recipient.id,
      senderName: recipient.name,
      message: `Hello! I'm interested in your ${crop?.name || 'crop listing'}.`,
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      cropId: crop?.id
    },
    {
      id: '2',
      senderId: currentUser.id,
      senderName: currentUser.name,
      message: 'Thank you for your interest! How much quantity are you looking for?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
      cropId: crop?.id
    },
    {
      id: '3',
      senderId: recipient.id,
      senderName: recipient.name,
      message: 'I need around 500kg. Can you tell me more about the quality?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      cropId: crop?.id
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      cropId: crop?.id
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate a response after 2 seconds
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        senderId: recipient.id,
        senderName: recipient.name,
        message: 'Thank you for the information. Let me discuss with my team and get back to you.',
        timestamp: new Date().toISOString(),
        cropId: crop?.id
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {recipient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{recipient.name}</h2>
                <p className="text-sm text-muted-foreground">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Crop Context */}
      {crop && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <ImageWithFallback
                src={crop.photo}
                alt={crop.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{crop.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ₹{crop.price}/{crop.unit} • {crop.quantity} {crop.unit} available
                </p>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  AGMARK {crop.agmarkGrade}
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      <Card className="flex-1 flex flex-col h-96">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === currentUser.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === currentUser.id
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        <Separator />

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button type="submit" disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
